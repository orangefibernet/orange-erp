import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { OltService } from '../../olt/olt.service';
import { PonPortService } from '../../pon-port/pon-port.service';
import { OnuService } from '../../onu/onu.service';

import { DeviceConnection } from '../interfaces/device-connection.interface';
import { ZteOnuService } from '../vendors/zte/services/onu.service';

@Injectable()
export class OnuSyncService {
  private readonly logger =
    new Logger(OnuSyncService.name);

  constructor(
    private readonly oltService: OltService,
    private readonly ponPortService: PonPortService,
    private readonly onuService: OnuService,
    private readonly zteOnuService: ZteOnuService,
  ) {}

  async getOnuStates(
    oltId: string,
  ) {
    const olt =
      await this.oltService.findOne(oltId);

    if (!olt) {
      throw new Error('OLT not found.');
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    return this.zteOnuService.getOnuStates(
      connection,
    );
  }

  async syncOnuState(
    oltId: string,
  ) {
    this.logger.log(
      '========== ONU DISCOVERY START =========='
    );

    const olt =
      await this.oltService.findOne(oltId);

    if (!olt) {
      throw new Error('OLT not found.');
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    const states =
      await this.zteOnuService.getOnuStates(
        connection,
      );

    let createdOrUpdated = 0;
    let failed = 0;

    for (const state of states) {
      try {
        const ponPort =
          await this.ponPortService.findByLocation(
            olt.id,
            state.rack,
            state.shelf,
            state.rack,
            state.pon,
          );

        if (!ponPort) {
          this.logger.warn(
            `PON Port not found for ${state.interfaceName}`,
          );

          failed++;
          continue;
        }

        const detail =
          await this.zteOnuService.getOnuDetail(
            connection,
            state.interfaceName,
          );

        const optical =
          await this.zteOnuService.getOpticalPower(
            connection,
            state.interfaceName,
          );

        await this.onuService.upsertFromDiscovery({
          companyId: olt.companyId,
          branchId: olt.branchId ?? undefined,
          oltId: olt.id,
          ponPortId: ponPort.id,

          onuId: state.onuId,

          interfaceName:
            state.interfaceName,

          serialNumber:
            detail?.serialNumber,

          vendor: 'ZTE',

          model: detail?.model,

          adminState:
            state.adminState,

          omccState:
            state.omccState,

          phaseState:
            state.phaseState,

          channel:
            state.channel,
        });

        createdOrUpdated++;

        this.logger.log(
          `Synced ${state.interfaceName}`,
        );

        this.logger.debug(optical);
      } catch (error) {
        failed++;

        this.logger.error(
          `Failed ${state.interfaceName}`,
          error instanceof Error
            ? error.stack
            : undefined,
        );
      }
    }

    this.logger.log(
      '========== ONU DISCOVERY END =========='
    );

    return {
      success: true,
      discovered: states.length,
      synchronized: createdOrUpdated,
      failed,
    };
  }
}
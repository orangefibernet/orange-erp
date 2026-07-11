import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { OltService } from '../olt/olt.service';

import { DeviceConnection } from './interfaces/device-connection.interface';

import { CardParser } from './vendors/zte/parsers/card.parser';
import { ZteDriver } from './vendors/zte/zte.driver';

import { CardSyncService } from './services/card-sync.service';
import { PonPortSyncService } from './services/pon-port-sync.service';

import { OnuSyncService } from './sync/onu-sync.service';

@Injectable()
export class NetworkManagementService {
  private readonly logger =
    new Logger(NetworkManagementService.name);

  constructor(
    private readonly oltService: OltService,
    private readonly zteDriver: ZteDriver,
    private readonly cardSyncService: CardSyncService,
    private readonly ponPortSyncService: PonPortSyncService,
    private readonly onuSyncService: OnuSyncService,
  ) {}

  async syncCards(
    oltId: string,
  ) {
    return this.cardSyncService.syncCards(
      oltId,
    );
  }

  async syncPonPorts(
    oltId: string,
  ) {
    return this.ponPortSyncService.syncPonPorts(
      oltId,
    );
  }

  async syncOnus(
    oltId: string,
  ) {
    return this.onuSyncService.syncOnuState(
      oltId,
    );
  }

  async getCards(
    oltId: string,
  ) {
    const olt =
      await this.oltService.findOne(oltId);

    if (!olt) {
      throw new NotFoundException(
        'OLT not found',
      );
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    const output =
      await this.zteDriver.showCards(
        connection,
      );

    return CardParser.parse(output);
  }

  async testConnection(
    oltId: string,
  ) {
    const olt =
      await this.oltService.findOne(oltId);

    if (!olt) {
      throw new NotFoundException(
        'OLT not found',
      );
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    return this.zteDriver.testConnection(
      connection,
    );
  }
}
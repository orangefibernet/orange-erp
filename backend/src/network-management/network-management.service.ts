import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { OltService } from '../olt/olt.service';
import { RebootOnuDto } from './dto/reboot-onu.dto';
import { DeviceConnection } from './interfaces/device-connection.interface';
import { DeprovisionOnuDto } from './dto/deprovision-onu.dto';
import { CardParser } from './vendors/zte/parsers/card.parser';
import { ZteDriver } from './vendors/zte/zte.driver';
import { ToggleOnuDto } from './dto/toggle-onu.dto';
import { CardSyncService } from './services/card-sync.service';
import { PonPortSyncService } from './services/pon-port-sync.service';
import { OnuSyncService } from './sync/onu-sync.service';
import { FactoryResetOnuDto } from './dto/factory-reset-onu.dto';
import { ProvisionOnuDto } from './dto/provision-onu.dto';
import { RenameOnuDto } from './dto/rename-onu.dto';

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

  private async getConnection(
    oltId: string,
  ): Promise<DeviceConnection> {
    const olt =
      await this.oltService.findOne(oltId);

    if (!olt) {
      throw new NotFoundException(
        'OLT not found',
      );
    }

    return {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };
  }

async factoryResetOnu(
  oltId: string,
  dto: FactoryResetOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.factoryResetOnu(
    connection,
    dto.interfaceName,
  );
}

async enableOnu(
  oltId: string,
  dto: ToggleOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.enableOnu(
    connection,
    dto.interfaceName,
  );
}

async disableOnu(
  oltId: string,
  dto: ToggleOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.disableOnu(
    connection,
    dto.interfaceName,
  );
}

async renameOnu(
  oltId: string,
  dto: RenameOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.renameOnu(
    connection,
    dto.interfaceName,
    dto.name,
  );
}

  async testConnection(
    oltId: string,
  ) {
    const connection =
      await this.getConnection(oltId);

    return this.zteDriver.testConnection(
      connection,
    );
  }

  async getCards(
    oltId: string,
  ) {
    const connection =
      await this.getConnection(oltId);

    const output =
      await this.zteDriver.showCards(
        connection,
      );

    return CardParser.parse(output);
  }

  async getOnuStates(
    oltId: string,
  ) {
    return this.onuSyncService.getOnuStates(
      oltId,
    );
  }

  async getOnuDetail(
    oltId: string,
    interfaceName: string,
  ) {
    const connection =
      await this.getConnection(oltId);

    return this.zteDriver.getOnuDetail(
      connection,
      interfaceName,
    );
  }

  async getOpticalPower(
    oltId: string,
    interfaceName: string,
  ) {
    const connection =
      await this.getConnection(oltId);

    return this.zteDriver.getOpticalPower(
      connection,
      interfaceName,
    );
  }

  async getUnconfiguredOnus(
    oltId: string,
  ) {
    const connection =
      await this.getConnection(oltId);

    return this.zteDriver.getUnconfiguredOnus(
      connection,
    );
  }

  async provisionOnu(
    oltId: string,
    dto: ProvisionOnuDto,
  ) {
    const connection =
      await this.getConnection(oltId);

    return this.zteDriver.provisionOnu(
      connection,
      dto,
    );
  }
async deprovisionOnu(
  oltId: string,
  dto: DeprovisionOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.deprovisionOnu(
    connection,
    dto,
  );
}

  async rebootOnu(
  oltId: string,
  dto: RebootOnuDto,
) {
  const connection =
    await this.getConnection(
      oltId,
    );

  return this.zteDriver.rebootOnu(
    connection,
    dto.interfaceName,
  );
}

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
}
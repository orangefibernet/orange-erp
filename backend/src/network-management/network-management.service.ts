import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { OltService } from '../olt/olt.service';

import { DeviceConnection } from './interfaces/device-connection.interface';
import { CardParser } from './vendors/zte/parsers/card.parser';
import { ZteDriver } from './vendors/zte/zte.driver';

@Injectable()
export class NetworkManagementService {
  private readonly logger = new Logger(NetworkManagementService.name);

  constructor(
    private readonly oltService: OltService,
    private readonly zteDriver: ZteDriver,
  ) {}

  async getCards(
    oltId: string,
  ) {
    const olt = await this.oltService.findOne(oltId);

    if (!olt) {
      throw new NotFoundException('OLT not found');
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    this.logger.log(`Connecting to OLT ${olt.name} (${olt.managementIp}:${olt.telnetPort})`);

    try {
      const output = await this.zteDriver.showCards(connection);

      this.logger.log('Successfully received card information.');

      return CardParser.parse(output);
    } catch (error) {
      this.logger.error('Failed to retrieve OLT cards');
      this.logger.error(error?.stack || error);

      throw error;
    }
  }

  async testConnection(
    oltId: string,
  ) {
    const olt = await this.oltService.findOne(oltId);

    if (!olt) {
      throw new NotFoundException('OLT not found');
    }

    const connection: DeviceConnection = {
      host: olt.managementIp,
      port: olt.telnetPort,
      username: olt.username,
      password: olt.password,
      timeout: olt.timeout,
    };

    this.logger.log('=======================================');
    this.logger.log('Testing ZTE OLT Connection');
    this.logger.log(`OLT      : ${olt.name}`);
    this.logger.log(`Host     : ${connection.host}`);
    this.logger.log(`Port     : ${connection.port}`);
    this.logger.log(`Username : ${connection.username}`);
    this.logger.log('=======================================');

    try {
      const result = await this.zteDriver.testConnection(connection);

      this.logger.log('Connection successful.');

      return {
        success: true,
        message: 'OLT connection successful.',
        data: result,
      };
    } catch (error) {
      this.logger.error('=======================================');
      this.logger.error('OLT Connection Failed');
      this.logger.error(error?.message || error);
      this.logger.error(error?.stack || '');
      this.logger.error('=======================================');

      throw error;
    }
  }
}
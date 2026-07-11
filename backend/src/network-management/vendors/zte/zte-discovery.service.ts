import { Injectable } from '@nestjs/common';

import { DeviceConnection } from '../../interfaces/device-connection.interface';

import { ZteDriver } from './zte.driver';

import { ZteDiscoveredOnu } from './models/discovered-onu.model';

@Injectable()
export class ZteDiscoveryService {
  constructor(
    private readonly driver: ZteDriver,
  ) {}

  /**
   * Discover every ONU from a ZTE OLT.
   */
  async discover(
    connection: DeviceConnection,
  ): Promise<ZteDiscoveredOnu[]> {
    const result: ZteDiscoveredOnu[] = [];

    const states =
      await this.driver.getOnuStates(connection);

    for (const state of states) {
      try {
        const details =
          await this.driver.getOnuDetail(
            connection,
            state.interfaceName,
          );

        const optical =
          await this.driver.getOpticalPower(
            connection,
            state.interfaceName,
          );

        result.push({
          state,
          detail: details[0],
          optical,
        });
      } catch (error) {
        result.push({
          state,
        });
      }
    }

    return result;
  }
}
import { Injectable } from '@nestjs/common';

import { DeviceConnection } from '../../../interfaces/device-connection.interface';

import { ZteDriver } from '../zte.driver';

import { ZteOnuState } from '../models/onu-state.model';
import { ZteOnuDetail } from '../models/onu-detail.model';
import { ZteOpticalPower } from '../models/optical-power.model';

@Injectable()
export class ZteOnuService {
  constructor(
    private readonly driver: ZteDriver,
  ) {}

  /**
   * Get all ONU states from the OLT.
   */
  async getOnuStates(
    connection: DeviceConnection,
  ): Promise<ZteOnuState[]> {
    return this.driver.getOnuStates(connection);
  }

  /**
   * Get one ONU detail.
   */
  async getOnuDetail(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOnuDetail | null> {
    const details =
      await this.driver.getOnuDetail(
        connection,
        interfaceName,
      );

    return details.length
      ? details[0]
      : null;
  }

  /**
   * Get ONU optical information.
   */
  async getOpticalPower(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOpticalPower> {
    return this.driver.getOpticalPower(
      connection,
      interfaceName,
    );
  }
}
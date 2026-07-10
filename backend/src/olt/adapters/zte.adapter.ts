import { Injectable } from '@nestjs/common';

import { OltDevice } from '../interfaces/olt-device.interface';

@Injectable()
export class ZteAdapter
  implements OltDevice
{
  async connect(
    oltId: string,
  ): Promise<void> {
    console.log(
      `Connecting to ZTE OLT ${oltId}`,
    );
  }

  async disconnect(): Promise<void> {}

  async testConnection(): Promise<boolean> {
    return true;
  }

  async discoverOnus(): Promise<any[]> {
    return [];
  }

  async authorizeOnu(): Promise<any> {
    return {};
  }

  async deleteOnu(): Promise<void> {}

  async rebootOnu(): Promise<void> {}

  async enableOnu(): Promise<void> {}

  async disableOnu(): Promise<void> {}

  async getOpticalPower(): Promise<any> {
    return {};
  }

  async configureServicePort(): Promise<void> {}
}

import { Injectable } from '@nestjs/common';

import { ProvisioningQueueService } from '../provisioning-queue/provisioning-queue.service';

@Injectable()
export class ProvisioningService {
  constructor(
    private readonly queue: ProvisioningQueueService,
  ) {}

  async provision(data: any) {
    return {
      success: true,
      message: 'Provisioning request queued.',
      data,
    };
  }

  async activate(connectionId: string) {
    return this.queue.activate(connectionId);
  }

  async suspend(connectionId: string) {
    return this.queue.suspend(connectionId);
  }

  async resume(connectionId: string) {
    return this.queue.resume(connectionId);
  }

  async disconnect(connectionId: string) {
    return this.queue.disconnect(connectionId);
  }

  async changePackage(
    connectionId: string,
    subscriptionId: string,
  ) {
    return this.queue.changePackage(
      connectionId,
      subscriptionId,
    );
  }

  async changePassword(
    connectionId: string,
    password: string,
  ) {
    return {
      success: true,
      connectionId,
      password,
      message: 'Password change queue not implemented yet.',
    };
  }
}
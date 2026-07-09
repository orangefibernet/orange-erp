import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { ProvisioningJobService } from '../provisioning-job/provisioning-job.service';

@Injectable()
export class ProvisioningQueueService {
  constructor(
    @InjectQueue('provisioning')
    private readonly queue: Queue,

    private readonly provisioningJobService: ProvisioningJobService,
  ) {}

  private async enqueue(
    action: string,
    data: Record<string, any>,
  ) {
    const job = await this.queue.add(
      action,
      data,
      {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 1000,
      },
    );

    await this.provisioningJobService.create({
      queueJobId: job.id?.toString(),
      connectionId: data.connectionId,
      action,
      status: 'QUEUED',
      payload: data,
    });

    return job;
  }

  async activate(connectionId: string) {
    return this.enqueue('activate', {
      connectionId,
    });
  }

  async suspend(connectionId: string) {
    return this.enqueue('suspend', {
      connectionId,
    });
  }

  async resume(connectionId: string) {
    return this.enqueue('resume', {
      connectionId,
    });
  }

  async disconnect(connectionId: string) {
    return this.enqueue('disconnect', {
      connectionId,
    });
  }

  async changePackage(
    connectionId: string,
    subscriptionId: string,
  ) {
    return this.enqueue('change-package', {
      connectionId,
      subscriptionId,
    });
  }
}
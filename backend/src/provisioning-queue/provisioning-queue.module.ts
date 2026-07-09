import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { ProvisioningCoreModule } from '../provisioning-core/provisioning-core.module';

import { ProvisioningProcessor } from './provisioning.processor';
import { ProvisioningQueueService } from './provisioning-queue.service';
import { ProvisioningJobModule } from '../provisioning-job/provisioning-job.module';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'provisioning',
    }),
    ProvisioningCoreModule,
    ProvisioningJobModule,
  ],
  providers: [
    ProvisioningQueueService,
    ProvisioningProcessor,
  ],
  exports: [
    ProvisioningQueueService,
  ],
})
export class ProvisioningQueueModule {}
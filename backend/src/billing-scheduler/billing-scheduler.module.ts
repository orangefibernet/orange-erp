import { Module } from '@nestjs/common';

import { BillingModule } from '../billing/billing.module';
import { ProvisioningQueueModule } from '../provisioning-queue/provisioning-queue.module';

import { BillingSchedulerService } from './billing-scheduler.service';

@Module({
  imports: [
    BillingModule,
    ProvisioningQueueModule,
  ],
  providers: [BillingSchedulerService],
})
export class BillingSchedulerModule {}
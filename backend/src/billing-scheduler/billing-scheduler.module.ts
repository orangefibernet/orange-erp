import { Module } from '@nestjs/common';
import { BillingSchedulerService } from './billing-scheduler.service';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [BillingModule],
  providers: [BillingSchedulerService],
})
export class BillingSchedulerModule {}
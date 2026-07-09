import {
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';

import { BillingService } from '../billing/billing.service';
import { ProvisioningQueueService } from '../provisioning-queue/provisioning-queue.service';

@Injectable()
export class BillingSchedulerService {
  private readonly logger = new Logger(
    BillingSchedulerService.name,
  );

  constructor(
    private readonly billingService: BillingService,
    private readonly provisioningQueue: ProvisioningQueueService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateMonthlyBills() {
    this.logger.log(
      'Monthly Billing Started',
    );

    const count =
      await this.billingService.generateMonthlyBills();

    this.logger.log(
      `Generated ${count} billing record(s).`,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async suspendOverdueCustomers() {
    this.logger.log(
      'Checking overdue customers...',
    );

    await this.billingService.markOverdueBills();

    const overdueBills =
      await this.billingService.findOverdueBills();

    let queued = 0;

    for (const bill of overdueBills) {
      for (const connection of bill.subscription.connections) {
        await this.provisioningQueue.suspend(
          connection.id,
        );
        queued++;
      }
    }

    this.logger.log(
      `Queued ${queued} suspend job(s).`,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async resumePaidCustomers() {
    this.logger.log(
      'Checking paid customers...',
    );

    const paidBills =
      await this.billingService.findPaidBills();

    let queued = 0;

    for (const bill of paidBills) {
      for (const connection of bill.subscription.connections) {
        await this.provisioningQueue.resume(
          connection.id,
        );
        queued++;
      }
    }

    this.logger.log(
      `Queued ${queued} resume job(s).`,
    );
  }
}
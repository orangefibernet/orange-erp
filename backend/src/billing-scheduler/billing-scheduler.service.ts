import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BillingSchedulerService {
  private readonly logger = new Logger(BillingSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateMonthlyBills() {
    this.logger.log('Monthly Billing Started');

    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const subscriptions =
      await this.prisma.subscription.findMany({
        where: {
          status: 'ACTIVE',
        },
        include: {
          package: true,
        },
      });

    let generated = 0;

    for (const subscription of subscriptions) {
      const exists =
        await this.prisma.billing.findFirst({
          where: {
            subscriptionId: subscription.id,
            billingMonth: month,
            billingYear: year,
          },
        });

      if (exists) {
        continue;
      }

      const amount = Number(
        subscription.package.monthlyPrice,
      );

      const gstPercentage = Number(
        subscription.package.gstPercentage,
      );

      const gstAmount =
        (amount * gstPercentage) / 100;

      const totalAmount = amount + gstAmount;

      const dueDate = new Date(
        year,
        month - 1,
        10,
      );

      await this.prisma.billing.create({
        data: {
          subscription: {
            connect: {
              id: subscription.id,
            },
          },

          billingMonth: month,
          billingYear: year,

          invoiceNumber: `INV-${year}${String(month).padStart(2, '0')}-${generated + 1}`,

          amount,

          gstAmount,

          totalAmount,

          dueDate,
        },
      });

      generated++;
    }

    this.logger.log(
      `Generated ${generated} invoice(s).`,
    );
  }
}
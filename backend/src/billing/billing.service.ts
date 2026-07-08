import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CounterService } from '../counter/counter.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly counterService: CounterService,
  ) {}

  async findAll() {
    return this.prisma.billing.findMany({
      include: {
        subscription: {
          include: {
            customer: true,
            package: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const billing = await this.prisma.billing.findUnique({
      where: { id },
      include: {
        subscription: {
          include: {
            customer: true,
            package: true,
          },
        },
        payments: true,
      },
    });

    if (!billing) {
      throw new NotFoundException('Billing record not found');
    }

    return billing;
  }

  async findInvoiceData(id: string) {
    return this.findOne(id);
  }

  async generateMonthlyBills(): Promise<number> {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        package: true,
      },
    });

    let generated = 0;

    for (const subscription of subscriptions) {
      const exists = await this.prisma.billing.findFirst({
        where: {
          subscriptionId: subscription.id,
          billingMonth: month,
          billingYear: year,
        },
      });

      if (exists) {
        continue;
      }

      const amount = Number(subscription.package.monthlyPrice);

      const gstAmount =
        (amount * Number(subscription.package.gstPercentage)) / 100;

      const totalAmount = amount + gstAmount;

      const dueDate = new Date(year, month - 1, 10);

      const invoiceNumber =
        await this.counterService.nextYearly('INV');

      await this.prisma.billing.create({
        data: {
          subscriptionId: subscription.id,

          billingMonth: month,
          billingYear: year,

          invoiceNumber,

          amount,

          gstAmount,

          totalAmount,

          dueDate,

          status: 'GENERATED',
        },
      });

      generated++;
    }

    this.logger.log(`Generated ${generated} billing record(s).`);

    return generated;
  }
}
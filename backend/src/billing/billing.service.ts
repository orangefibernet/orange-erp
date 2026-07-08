import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CounterService } from '../counter/counter.service';
import { CreateBillingDto } from './dto/create-billing.dto';

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
async generateOne(dto: CreateBillingDto) {
  const exists = await this.prisma.billing.findFirst({
    where: {
      subscriptionId: dto.subscriptionId,
      billingMonth: dto.billingMonth,
      billingYear: dto.billingYear,
    },
  });

  if (exists) {
    throw new Error(
      'Billing already generated for this period',
    );
  }

  const subscription =
    await this.prisma.subscription.findUnique({
      where: {
        id: dto.subscriptionId,
      },
      include: {
        package: true,
      },
    });

  if (!subscription) {
    throw new NotFoundException(
      'Subscription not found',
    );
  }

  const amount = Number(subscription.package.monthlyPrice);

  const gstPercentage = Number(
    subscription.package.gstPercentage,
  );

  const gstAmount =
    (amount * gstPercentage) / 100;

  const totalAmount =
    amount + gstAmount;

  const invoiceNumber =
    await this.counterService.nextYearly('INV');

  const dueDate = new Date(
    dto.billingYear,
    dto.billingMonth - 1,
    subscription.billingDay,
  );

  return this.prisma.billing.create({
    data: {
      subscriptionId: subscription.id,

      billingMonth: dto.billingMonth,
      billingYear: dto.billingYear,

      invoiceNumber,

      

      amount,

      gstPercentage,

      gstAmount,

      totalAmount,

      dueDate,

      status: 'GENERATED',

      remarks: dto.remarks,
    },
  });
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
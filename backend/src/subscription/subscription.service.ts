import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BillingCycle,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateExpiryDate(
    startDate: Date,
    billingCycle: BillingCycle,
  ): Date {
    const expiry = new Date(startDate);

    switch (billingCycle) {
      case BillingCycle.MONTHLY:
        expiry.setMonth(expiry.getMonth() + 1);
        break;

      case BillingCycle.QUARTERLY:
        expiry.setMonth(expiry.getMonth() + 3);
        break;

      case BillingCycle.HALF_YEARLY:
        expiry.setMonth(expiry.getMonth() + 6);
        break;

      case BillingCycle.YEARLY:
        expiry.setFullYear(expiry.getFullYear() + 1);
        break;
    }

    return expiry;
  }

  async create(dto: CreateSubscriptionDto) {
    const existing = await this.prisma.subscription.findFirst({
      where: {
        customerId: dto.customerId,
        status: {
          in: ['ACTIVE', 'PENDING'],
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        'Customer already has an active subscription',
      );
    }

    const expiryDate = this.calculateExpiryDate(
      new Date(dto.startDate),
      dto.billingCycle,
    );

    return this.prisma.subscription.create({
      data: {
        customer: {
          connect: {
            id: dto.customerId,
          },
        },

        package: {
          connect: {
            id: dto.packageId,
          },
        },

        monthlyPrice: new Prisma.Decimal(dto.monthlyPrice),

        installationCharge:
          dto.installationCharge !== undefined
            ? new Prisma.Decimal(dto.installationCharge)
            : undefined,

        securityDeposit:
          dto.securityDeposit !== undefined
            ? new Prisma.Decimal(dto.securityDeposit)
            : undefined,

        discountAmount:
          dto.discountAmount !== undefined
            ? new Prisma.Decimal(dto.discountAmount)
            : undefined,

        billingCycle: dto.billingCycle,
        billingDay: dto.billingDay,

        startDate: new Date(dto.startDate),
        expiryDate,

        autoRenew: dto.autoRenew ?? true,
        status: dto.status,
        remarks: dto.remarks,
      },
    });
  }

  findAll() {
    return this.prisma.subscription.findMany({
      include: {
        customer: true,
        package: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const subscription =
      await this.prisma.subscription.findUnique({
        where: { id },
        include: {
          customer: true,
          package: true,
        },
      });

    if (!subscription) {
      throw new NotFoundException(
        'Subscription not found',
      );
    }

    return subscription;
  }

  async update(
    id: string,
    dto: UpdateSubscriptionDto,
  ) {
    await this.findOne(id);

    const data: Prisma.SubscriptionUpdateInput = {};

    if (dto.packageId) {
      data.package = {
        connect: {
          id: dto.packageId,
        },
      };
    }

    if (dto.monthlyPrice !== undefined) {
      data.monthlyPrice = new Prisma.Decimal(
        dto.monthlyPrice,
      );
    }

    if (dto.installationCharge !== undefined) {
      data.installationCharge = new Prisma.Decimal(
        dto.installationCharge,
      );
    }

    if (dto.securityDeposit !== undefined) {
      data.securityDeposit = new Prisma.Decimal(
        dto.securityDeposit,
      );
    }

    if (dto.discountAmount !== undefined) {
      data.discountAmount = new Prisma.Decimal(
        dto.discountAmount,
      );
    }

    if (dto.billingCycle) {
      data.billingCycle = dto.billingCycle;
    }

    if (dto.billingDay !== undefined) {
      data.billingDay = dto.billingDay;
    }

    if (dto.startDate) {
      data.startDate = new Date(dto.startDate);

      data.expiryDate = this.calculateExpiryDate(
        new Date(dto.startDate),
        dto.billingCycle ?? BillingCycle.MONTHLY,
      );
    }

    if (dto.autoRenew !== undefined) {
      data.autoRenew = dto.autoRenew;
    }

    if (dto.status) {
      data.status = dto.status;
    }

    if (dto.remarks !== undefined) {
      data.remarks = dto.remarks;
    }

    return this.prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subscription.delete({
      where: { id },
    });
  }
}
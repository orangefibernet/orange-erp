import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { BillingStatus } from '@prisma/client';
import { CounterService } from '../counter/counter.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly counterService: CounterService,
) {}

  async create(dto: CreatePaymentDto) {
    const billing = await this.prisma.billing.findUnique({
      where: {
        id: dto.billingId,
      },
      include: {
        payments: true,
      },
    });

    if (!billing) {
      throw new NotFoundException('Billing record not found');
    }

    const totalPaid = billing.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    const billAmount = Number(billing.totalAmount);

    if (totalPaid + dto.amount > billAmount) {
      throw new BadRequestException(
        'Payment exceeds outstanding balance',
      );
    }
    const receiptNumber =
        await this.counterService.nextYearly('RCP');

    const payment = await this.prisma.payment.create({
      data: {
        billing: {
          connect: {
            id: dto.billingId,
          },
        },
        receiptNumber,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        transactionId: dto.transactionId,
        paymentDate: dto.paymentDate
          ? new Date(dto.paymentDate)
          : new Date(),
        collectedBy: dto.collectedBy,
        remarks: dto.remarks,
      },
    });

    const newPaid = totalPaid + dto.amount;

    let status: BillingStatus = BillingStatus.PENDING;

    if (newPaid >= billAmount) {
      status = BillingStatus.PAID;
    }

    await this.prisma.billing.update({
      where: {
        id: dto.billingId,
      },
      data: {
        status,
        paidDate:
          status === BillingStatus.PAID
            ? new Date()
            : null,
      },
    });

    return payment;
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        billing: {
          include: {
            subscription: {
              include: {
                customer: true,
              },
            },
          },
        },
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        billing: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  update(id: string, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        transactionId: dto.transactionId,
        collectedBy: dto.collectedBy,
        remarks: dto.remarks,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.payment.delete({
      where: { id },
    });
  }
}
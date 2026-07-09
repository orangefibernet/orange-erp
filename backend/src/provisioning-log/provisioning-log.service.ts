import { Injectable } from '@nestjs/common';
import {
  ProvisioningAction,
  ProvisioningStatus,
} from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProvisioningLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    customerId?: string;
    connectionId?: string;
    action: ProvisioningAction;
    status: ProvisioningStatus;
    message?: string;
    executedBy?: string;
  }) {
    return this.prisma.provisioningLog.create({
      data: {
        customerId: data.customerId,
        connectionId: data.connectionId,
        action: data.action,
        status: data.status,
        message: data.message,
        executedBy: data.executedBy,
      },
    });
  }

  async findAll() {
    return this.prisma.provisioningLog.findMany({
      include: {
        customer: true,
        connection: true,
      },
      orderBy: {
        executedAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.provisioningLog.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        connection: true,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return this.prisma.provisioningLog.findMany({
      where: {
        customerId,
      },
      include: {
        customer: true,
        connection: true,
      },
      orderBy: {
        executedAt: 'desc',
      },
    });
  }

  async findByConnection(connectionId: string) {
    return this.prisma.provisioningLog.findMany({
      where: {
        connectionId,
      },
      include: {
        customer: true,
        connection: true,
      },
      orderBy: {
        executedAt: 'desc',
      },
    });
  }

  async remove(id: string) {
    return this.prisma.provisioningLog.delete({
      where: {
        id,
      },
    });
  }
}
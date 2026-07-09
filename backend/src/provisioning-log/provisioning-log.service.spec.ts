import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProvisioningLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    connectionId?: string;
    action: string;
    status: string;
    message?: string;
    payload?: unknown;
  }) {
    return this.prisma.provisioningLog.create({
      data: {
        connectionId: data.connectionId,
        action: data.action,
        status: data.status,
        message: data.message,
        payload: data.payload as any,
      },
    });
  }
}
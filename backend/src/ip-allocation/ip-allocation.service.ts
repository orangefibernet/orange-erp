import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { IpAddressStatus } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IpAllocationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async allocate(
    ipPoolName: string,
    customerId: string,
    connectionId: string,
  ) {
    const pool = await this.prisma.ipPool.findFirst({
      where: {
        name: ipPoolName,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!pool) {
      throw new BadRequestException(
        `IP Pool "${ipPoolName}" not found or inactive`,
      );
    }

    const existing =
      await this.prisma.ipAddress.findFirst({
        where: {
          connectionId,
          status: IpAddressStatus.ASSIGNED,
        },
      });

    if (existing) {
      return existing;
    }

    const ip = await this.prisma.ipAddress.findFirst({
      where: {
        ipPoolId: pool.id,
        status: IpAddressStatus.FREE,
      },
      orderBy: {
        ipAddress: 'asc',
      },
    });

    if (!ip) {
      throw new BadRequestException(
        `No free IP available in pool "${pool.name}"`,
      );
    }

    return this.prisma.ipAddress.update({
      where: {
        id: ip.id,
      },
      data: {
        status: IpAddressStatus.ASSIGNED,
        customerId,
        connectionId,
        assignedAt: new Date(),
        releasedAt: null,
      },
    });
  }

  async release(ipId: string) {
    return this.prisma.ipAddress.update({
      where: {
        id: ipId,
      },
      data: {
        status: IpAddressStatus.FREE,
        customerId: null,
        connectionId: null,
        assignedAt: null,
        releasedAt: new Date(),
      },
    });
  }

  async releaseByConnection(
    connectionId: string,
  ) {
    return this.prisma.ipAddress.updateMany({
      where: {
        connectionId,
      },
      data: {
        status: IpAddressStatus.FREE,
        customerId: null,
        connectionId: null,
        assignedAt: null,
        releasedAt: new Date(),
      },
    });
  }

  async getAllocatedIp(
    connectionId: string,
  ) {
    return this.prisma.ipAddress.findFirst({
      where: {
        connectionId,
        status: IpAddressStatus.ASSIGNED,
      },
    });
  }

  async getFreeCount(
    ipPoolName: string,
  ) {
    const pool = await this.prisma.ipPool.findFirst({
      where: {
        name: ipPoolName,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!pool) {
      throw new BadRequestException(
        `IP Pool "${ipPoolName}" not found`,
      );
    }

    return this.prisma.ipAddress.count({
      where: {
        ipPoolId: pool.id,
        status: IpAddressStatus.FREE,
      },
    });
  }
}
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { IpAddressStatus } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IpGeneratorService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async generate(ipPoolId: string) {
    const pool = await this.prisma.ipPool.findUnique({
      where: {
        id: ipPoolId,
      },
    });

    if (!pool) {
      throw new BadRequestException(
        'IP Pool not found',
      );
    }

    const start = Number(pool.startIp.split('.').pop());
    const end = Number(pool.endIp.split('.').pop());

    const prefix = pool.startIp
      .split('.')
      .slice(0, 3)
      .join('.');

    let created = 0;

    for (let i = start; i <= end; i++) {
      const ip = `${prefix}.${i}`;

      const exists =
        await this.prisma.ipAddress.findFirst({
          where: {
            ipPoolId,
            ipAddress: ip,
          },
        });

      if (exists) {
        continue;
      }

      await this.prisma.ipAddress.create({
        data: {
          ipPoolId,
          ipAddress: ip,
          status: IpAddressStatus.FREE,
        },
      });

      created++;
    }

    return {
      success: true,
      created,
    };
  }
}
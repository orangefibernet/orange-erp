import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { ProvisioningContext } from './interfaces/provisioning-context.interface';

@Injectable()
export class ProvisioningContextService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async load(
    connectionId: string,
  ): Promise<ProvisioningContext> {
    const connection =
      await this.prisma.connection.findUnique({
        where: {
          id: connectionId,
        },
        include: {
          customer: true,
          subscription: {
            include: {
              package: true,
            },
          },
          nas: true,
          onu: true,
          ipAddresses: {
            where: {
              releasedAt: null,
            },
            take: 1,
          },
        },
      });

    if (!connection) {
      throw new NotFoundException(
        `Connection ${connectionId} not found`,
      );
    }

    return {
      connection,
      customer: connection.customer,
      subscription: connection.subscription,
      package: connection.subscription.package,
      nas: connection.nas,
      onu: connection.onu,
      allocatedIp:
        connection.ipAddresses.length > 0
          ? connection.ipAddresses[0]
          : null,
    };
  }
}
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class ValidateStep
  implements ProvisioningStep
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    const connection =
      await this.prisma.connection.findFirst({
        where: {
          customerId: context.customerId,
          subscriptionId:
            context.subscriptionId,
          deletedAt: null,
        },
        include: {
          subscription: {
            include: {
              package: true,
            },
          },
          customer: true,
          nas: true,
          onu: true,
        },
      });

    if (!connection) {
      throw new NotFoundException(
        'Connection not found',
      );
    }

    context.connection = connection;
  }
}
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ProvisioningAction,
  ProvisioningStatus,
} from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { ProvisioningLogService } from '../provisioning-log/provisioning-log.service';
import { RadiusService } from '../radius/radius.service';
import { ProvisioningQueueService } from '../provisioning-queue/provisioning-queue.service';

import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly radiusService: RadiusService,
    private readonly provisioningLogService: ProvisioningLogService,
    private readonly provisioningQueueService: ProvisioningQueueService,
  ) {}

  async create(dto: CreateConnectionDto) {
    const existingConnection =
      await this.prisma.connection.findFirst({
        where: {
          OR: [
            {
              connectionNumber: dto.connectionNumber,
            },
            {
              pppoeUsername: dto.pppoeUsername,
            },
          ],
        },
      });

    if (existingConnection) {
      throw new ConflictException(
        'Connection number or PPPoE username already exists',
      );
    }

    const connection =
      await this.prisma.connection.create({
        data: {
          customer: {
            connect: {
              id: dto.customerId,
            },
          },

          subscription: {
            connect: {
              id: dto.subscriptionId,
            },
          },

          ...(dto.onuId && {
            onu: {
              connect: {
                id: dto.onuId,
              },
            },
          }),

          ...(dto.nasId && {
            nas: {
              connect: {
                id: dto.nasId,
              },
            },
          }),

          connectionNumber: dto.connectionNumber,
          serviceType: dto.serviceType,
          pppoeUsername: dto.pppoeUsername,
          pppoePassword: dto.pppoePassword,
          vlanId: dto.vlanId,
          staticIp: dto.staticIp,
          macAddress: dto.macAddress,

          installationDate: dto.installationDate
            ? new Date(dto.installationDate)
            : undefined,

          activationDate: dto.activationDate
            ? new Date(dto.activationDate)
            : undefined,

          disconnectedDate: dto.disconnectedDate
            ? new Date(dto.disconnectedDate)
            : undefined,

          installedBy: dto.installedBy,
          activatedBy: dto.activatedBy,
          status: dto.status,
          remarks: dto.remarks,
        },
      });

    try {
  await this.provisioningQueueService.activate(
    connection.id,
  );

  await this.provisioningLogService.create({
    customerId: connection.customerId,
    connectionId: connection.id,
    action: ProvisioningAction.CREATE_CONNECTION,
    status: ProvisioningStatus.SUCCESS,
    message:
      'Provisioning job queued successfully',
    executedBy: 'SYSTEM',
  });

  return {
    ...connection,
    provisioningStatus: 'QUEUED',
  };
} catch (error) {
  await this.provisioningLogService.create({
    customerId: connection.customerId,
    connectionId: connection.id,
    action: ProvisioningAction.CREATE_CONNECTION,
    status: ProvisioningStatus.FAILED,
    message:
      error instanceof Error
        ? error.message
        : 'Failed to queue provisioning job',
    executedBy: 'SYSTEM',
  });

  throw error;
}
  }

  async findAll() {
    return this.prisma.connection.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        customer: true,
        subscription: true,
        onu: true,
        nas: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const connection =
      await this.prisma.connection.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        include: {
          customer: true,
          subscription: true,
          onu: true,
          nas: true,
        },
      });

    if (!connection) {
      throw new NotFoundException(
        'Connection not found',
      );
    }

    return connection;
  }

  async update(
    id: string,
    dto: UpdateConnectionDto,
  ) {
    const existingConnection =
      await this.findOne(id);

    const {
      customerId,
      subscriptionId,
      onuId,
      nasId,
      installationDate,
      activationDate,
      disconnectedDate,
      ...data
    } = dto;

    const connection =
      await this.prisma.connection.update({
        where: {
          id,
        },
        data: {
          ...data,

          ...(installationDate && {
            installationDate: new Date(
              installationDate,
            ),
          }),

          ...(activationDate && {
            activationDate: new Date(
              activationDate,
            ),
          }),

          ...(disconnectedDate && {
            disconnectedDate: new Date(
              disconnectedDate,
            ),
          }),

          ...(customerId && {
            customer: {
              connect: {
                id: customerId,
              },
            },
          }),

          ...(subscriptionId && {
            subscription: {
              connect: {
                id: subscriptionId,
              },
            },
          }),

          ...(onuId && {
            onu: {
              connect: {
                id: onuId,
              },
            },
          }),

          ...(nasId && {
            nas: {
              connect: {
                id: nasId,
              },
            },
          }),
        },
      });

      if (
      dto.pppoePassword &&
      dto.pppoePassword !==
        existingConnection.pppoePassword
    ) {
      await this.radiusService.changePassword(
        connection.pppoeUsername,
        connection.pppoePassword,
      );

      await this.provisioningLogService.create({
        customerId: connection.customerId,
        connectionId: connection.id,
        action:
          ProvisioningAction.UPDATE_RADIUS_PASSWORD,
        status: ProvisioningStatus.SUCCESS,
        message: 'RADIUS password updated',
        executedBy: 'SYSTEM',
      });
    }

    if (
      dto.subscriptionId &&
      dto.subscriptionId !==
        existingConnection.subscriptionId
    ) {
      const subscription =
        await this.prisma.subscription.findUnique({
          where: {
            id: dto.subscriptionId,
          },
          include: {
            package: true,
          },
        });

      if (subscription?.package.radiusGroup) {
        await this.radiusService.changeGroup(
          connection.pppoeUsername,
          subscription.package.radiusGroup,
        );

        await this.provisioningLogService.create({
          customerId: connection.customerId,
          connectionId: connection.id,
          action:
            ProvisioningAction.ASSIGN_RADIUS_GROUP,
          status: ProvisioningStatus.SUCCESS,
          message: `Assigned RADIUS group ${subscription.package.radiusGroup}`,
          executedBy: 'SYSTEM',
        });
      }
    }

    return connection;
  }

  async remove(id: string) {
    const connection =
      await this.findOne(id);

    await this.radiusService.deleteUser(
      connection.pppoeUsername,
    );

    await this.provisioningLogService.create({
      customerId: connection.customerId,
      connectionId: connection.id,
      action:
        ProvisioningAction.DELETE_RADIUS_USER,
      status: ProvisioningStatus.SUCCESS,
      message: 'Connection removed',
      executedBy: 'SYSTEM',
    });

    return this.prisma.connection.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
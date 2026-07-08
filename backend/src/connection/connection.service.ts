import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

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

    return this.prisma.connection.create({
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

        connectionNumber: dto.connectionNumber,
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
    await this.findOne(id);

    const {
      customerId,
      subscriptionId,
      onuId,
      installationDate,
      activationDate,
      disconnectedDate,
      ...data
    } = dto;

    return this.prisma.connection.update({
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
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

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
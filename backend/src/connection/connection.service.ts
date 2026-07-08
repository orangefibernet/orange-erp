import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateConnectionDto) {
    const { customerId, subscriptionId, onuId, ...data } = dto;

    return this.prisma.connection.create({
      data: {
        ...data,

        customer: {
          connect: {
            id: customerId,
          },
        },

        subscription: {
          connect: {
            id: subscriptionId,
          },
        },

        ...(onuId && {
          onu: {
            connect: {
              id: onuId,
            },
          },
        }),
      },
      include: {
        customer: true,
        subscription: true,
        onu: true,
      },
    });
  }

  findAll() {
    return this.prisma.connection.findMany({
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
    const connection = await this.prisma.connection.findUnique({
      where: { id },
      include: {
        customer: true,
        subscription: true,
        onu: true,
      },
    });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    return connection;
  }

  update(id: string, dto: UpdateConnectionDto) {
    const { customerId, subscriptionId, onuId, ...data } = dto;

    return this.prisma.connection.update({
      where: { id },
      data: {
        ...data,

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
      include: {
        customer: true,
        subscription: true,
        onu: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.connection.delete({
      where: {
        id,
      },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePonPortDto } from './dto/create-pon-port.dto';
import { UpdatePonPortDto } from './dto/update-pon-port.dto';

@Injectable()
export class PonPortService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePonPortDto) {
    const { companyId, branchId, oltId, ...data } = dto;

    return this.prisma.ponPort.create({
      data: {
        ...data,
        company: {
          connect: {
            id: companyId,
          },
        },
        olt: {
          connect: {
            id: oltId,
          },
        },
        ...(branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        }),
      },
    });
  }

  findAll() {
    return this.prisma.ponPort.findMany({
      include: {
        company: true,
        branch: true,
        olt: true,
        onus: true,
      },
      orderBy: {
        portNumber: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.ponPort.findUnique({
      where: { id },
      include: {
        company: true,
        branch: true,
        olt: true,
        onus: true,
      },
    });
  }

  update(id: string, dto: UpdatePonPortDto) {
    const { companyId, branchId, oltId, ...data } = dto;

    return this.prisma.ponPort.update({
      where: { id },
      data: {
        ...data,

        ...(companyId && {
          company: {
            connect: {
              id: companyId,
            },
          },
        }),

        ...(branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        }),

        ...(oltId && {
          olt: {
            connect: {
              id: oltId,
            },
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.ponPort.delete({
      where: { id },
    });
  }
}
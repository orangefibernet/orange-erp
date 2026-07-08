import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOnuDto } from './dto/create-onu.dto';
import { UpdateOnuDto } from './dto/update-onu.dto';

@Injectable()
export class OnuService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOnuDto) {
    const { companyId, branchId, oltId, ponPortId, ...data } = dto;

    return this.prisma.onu.create({
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
        ponPort: {
          connect: {
            id: ponPortId,
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
    return this.prisma.onu.findMany({
      include: {
        company: true,
        branch: true,
        olt: true,
        ponPort: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.onu.findUnique({
      where: { id },
      include: {
        company: true,
        branch: true,
        olt: true,
        ponPort: true,
      },
    });
  }

  update(id: string, dto: UpdateOnuDto) {
    const { companyId, branchId, oltId, ponPortId, ...data } = dto;

    return this.prisma.onu.update({
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

        ...(ponPortId && {
          ponPort: {
            connect: {
              id: ponPortId,
            },
          },
        }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.onu.delete({
      where: { id },
    });
  }
}
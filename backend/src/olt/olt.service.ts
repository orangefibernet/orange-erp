import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOltDto } from './dto/create-olt.dto';
import { UpdateOltDto } from './dto/update-olt.dto';

@Injectable()
export class OltService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOltDto) {
  const { companyId, branchId, ...data } = dto;

  return this.prisma.olt.create({
    data: {
      ...data,
      company: {
        connect: {
          id: companyId,
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
    return this.prisma.olt.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.olt.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateOltDto) {
    return this.prisma.olt.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.olt.delete({
      where: { id },
    });
  }
}
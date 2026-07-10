import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOltDto } from './dto/create-olt.dto';
import { UpdateOltDto } from './dto/update-olt.dto';
import { ZteAdapter } from './adapters/zte.adapter';

@Injectable()
export class OltService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly zteAdapter: ZteAdapter,
) {}

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
  async testConnection(id: string) {
  const olt = await this.findOne(id);

  if (!olt) {
    throw new Error('OLT not found');
  }

  await this.zteAdapter.connect(id);

  try {
    return await this.zteAdapter.testConnection();
  } finally {
    await this.zteAdapter.disconnect();
  }
}
}
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateIpPoolDto } from './dto/create-ip-pool.dto';
import { UpdateIpPoolDto } from './dto/update-ip-pool.dto';

@Injectable()
export class IpPoolService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateIpPoolDto) {
    return this.prisma.ipPool.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.ipPool.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
        nas: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const pool = await this.prisma.ipPool.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
        nas: true,
      },
    });

    if (!pool) {
      throw new NotFoundException(
        'IP Pool not found',
      );
    }

    return pool;
  }

  async update(
    id: string,
    dto: UpdateIpPoolDto,
  ) {
    await this.findOne(id);

    return this.prisma.ipPool.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.ipPool.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
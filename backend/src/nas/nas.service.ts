import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateNasDto } from './dto/create-nas.dto';
import { UpdateNasDto } from './dto/update-nas.dto';

@Injectable()
export class NasService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateNasDto) {
    return this.prisma.nas.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.nas.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const nas = await this.prisma.nas.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!nas) {
      throw new NotFoundException(
        'NAS not found',
      );
    }

    return nas;
  }

  async update(
    id: string,
    dto: UpdateNasDto,
  ) {
    await this.findOne(id);

    return this.prisma.nas.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.nas.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
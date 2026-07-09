import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateRadiusServerDto } from './dto/create-radius-server.dto';
import { UpdateRadiusServerDto } from './dto/update-radius-server.dto';

@Injectable()
export class RadiusServerService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateRadiusServerDto) {
    return this.prisma.radiusServer.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.radiusServer.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const server = await this.prisma.radiusServer.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
      },
    });

    if (!server) {
      throw new NotFoundException('Radius Server not found');
    }

    return server;
  }

  async update(id: string, dto: UpdateRadiusServerDto) {
    await this.findOne(id);

    return this.prisma.radiusServer.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.radiusServer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
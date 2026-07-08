import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreatePackageDto) {
  const existing = await this.prisma.package.findUnique({
    where: {
      code: dto.code,
    },
  });

  if (existing) {
    throw new ConflictException(
      'Package code already exists',
    );
  }

  return this.prisma.package.create({
    data: {
      ...dto,
    },
  });
}

  async findAll() {
    return this.prisma.package.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const pkg = await this.prisma.package.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    return pkg;
  }

  async update(
    id: string,
    dto: UpdatePackageDto,
  ) {
    await this.findOne(id);

    return this.prisma.package.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.package.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
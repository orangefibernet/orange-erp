import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageProvisioningService } from './package-provisioning/package-provisioning.service';

@Injectable()
export class PackageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly packageProvisioningService: PackageProvisioningService,
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

    const pkg = await this.prisma.package.create({
      data: {
        ...dto,
      },
    });

    await this.packageProvisioningService.sync(pkg);

    return pkg;
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
      throw new NotFoundException(
        'Package not found',
      );
    }

    return pkg;
  }

  async update(
    id: string,
    dto: UpdatePackageDto,
  ) {
    await this.findOne(id);

    const pkg = await this.prisma.package.update({
      where: {
        id,
      },
      data: dto,
    });

    await this.packageProvisioningService.sync(pkg);

    return pkg;
  }

  async remove(id: string) {
    const pkg = await this.findOne(id);

    await this.packageProvisioningService.remove(pkg);

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
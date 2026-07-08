import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Designation, Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';

import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Injectable()
export class DesignationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    companyId: string,
    dto: CreateDesignationDto,
  ): Promise<Designation> {
    const company = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    const existing = await this.prisma.designation.findFirst({
      where: {
        companyId,
        code: dto.code,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Designation code already exists.',
      );
    }

    return this.prisma.designation.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(
    companyId: string,
    query: PaginationDto,
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.DesignationWhereInput = {
      companyId,
      deletedAt: null,

      ...(query.search && {
        OR: [
          {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
          {
            code: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.designation.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.designation.count({
        where,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(
    companyId: string,
    id: string,
  ) {
    const designation = await this.prisma.designation.findFirst({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });

    if (!designation) {
      throw new NotFoundException(
        'Designation not found.',
      );
    }

    return designation;
  }

  async update(
    companyId: string,
    id: string,
    dto: UpdateDesignationDto,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.designation.update({
      where: { id },
      data: dto,
    });
  }

  async remove(
    companyId: string,
    id: string,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.designation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

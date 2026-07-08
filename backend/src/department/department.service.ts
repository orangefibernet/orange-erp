import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    companyId: string,
    dto: CreateDepartmentDto,
  ): Promise<Department> {
    const branch = await this.prisma.branch.findFirst({
      where: {
        id: dto.branchId,
        companyId,
        deletedAt: null,
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }

    const existing = await this.prisma.department.findFirst({
      where: {
        branchId: dto.branchId,
        code: dto.code,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Department code already exists for this branch.',
      );
    }

    return this.prisma.department.create({
      data: {
        companyId,
        branchId: dto.branchId,
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

    const where: Prisma.DepartmentWhereInput = {
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
      this.prisma.department.findMany({
        where,
        include: {
          company: true,
          branch: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.department.count({
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
    const department = await this.prisma.department.findFirst({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
      },
    });

    if (!department) {
      throw new NotFoundException('Department not found.');
    }

    return department;
  }

  async update(
    companyId: string,
    id: string,
    dto: UpdateDepartmentDto,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.department.update({
      where: { id },
      data: dto,
    });
  }

  async remove(
    companyId: string,
    id: string,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.department.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

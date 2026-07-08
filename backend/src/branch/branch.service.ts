import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Branch } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    companyId: string,
    dto: CreateBranchDto,
  ): Promise<Branch> {
    // Verify company exists
    const company = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    // Check duplicate branch code within the company
    const existing = await this.prisma.branch.findFirst({
      where: {
        companyId,
        code: dto.code,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Branch code already exists for this company.',
      );
    }

    return this.prisma.branch.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        address: dto.address,
        phone: dto.phone,
        email: dto.email,
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

    const where: Prisma.BranchWhereInput = {
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
      this.prisma.branch.findMany({
        where,
        include: {
          company: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),

      this.prisma.branch.count({
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
    const branch = await this.prisma.branch.findFirst({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      include: {
        company: true,
      },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }

    return branch;
  }

  async update(
    companyId: string,
    id: string,
    dto: UpdateBranchDto,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.branch.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(
    companyId: string,
    id: string,
  ) {
    await this.findOne(companyId, id);

    return this.prisma.branch.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
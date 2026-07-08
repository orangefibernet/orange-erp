import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    const existing = await this.prisma.company.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existing) {
      throw new ConflictException('Company code already exists.');
    }

    return this.prisma.company.create({
      data: {
        name: dto.name,
        code: dto.code,
        email: dto.email,
        phone: dto.phone,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.CompanyWhereInput = {
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
      this.prisma.company.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.company.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.findOne(id);

    return this.prisma.company.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
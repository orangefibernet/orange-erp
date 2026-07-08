import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateShiftDto) {
    const existing = await this.prisma.shift.findUnique({
      where: { code: dto.code },
    });

    if (existing) {
      throw new ConflictException('Shift code already exists.');
    }

    return this.prisma.shift.create({
      data: dto,
    });
  }

  async findAll(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ShiftWhereInput = {
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
      this.prisma.shift.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.shift.count({ where }),
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
    const shift = await this.prisma.shift.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!shift) {
      throw new NotFoundException('Shift not found.');
    }

    return shift;
  }

  async update(id: string, dto: UpdateShiftDto) {
    await this.findOne(id);

    return this.prisma.shift.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.shift.delete({
      where: { id },
    });
  }
}
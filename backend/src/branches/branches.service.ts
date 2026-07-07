import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: Replace with logged-in user's company later
  private readonly COMPANY_CODE = 'ORANGE';

  async create(dto: CreateBranchDto) {
    const company = await this.prisma.company.findUnique({
      where: { code: this.COMPANY_CODE },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const exists = await this.prisma.branch.findUnique({
      where: { code: dto.code },
    });

    if (exists) {
      throw new ConflictException('Branch code already exists');
    }

    return this.prisma.branch.create({
      data: {
        companyId: company.id,
        ...dto,
      },
    });
  }

  async findAll(search?: string) {
    return this.prisma.branch.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {},
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return branch;
  }

  async update(id: string, dto: UpdateBranchDto) {
    await this.findOne(id);

    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.branch.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.branch.findMany({
      include: {
        company: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  update(id: string, dto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.branch.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
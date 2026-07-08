import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(employeeId: string, dto: CreateBankDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    const existing = await this.prisma.employeeBank.findUnique({
      where: {
        employeeId,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Bank details already exist for this employee.',
      );
    }

    return this.prisma.employeeBank.create({
      data: {
        employeeId,
        ...dto,
      },
    });
  }

  async findOne(employeeId: string) {
    const bank = await this.prisma.employeeBank.findUnique({
      where: {
        employeeId,
      },
    });

    if (!bank) {
      throw new NotFoundException(
        'Bank details not found.',
      );
    }

    return bank;
  }

  async update(
    employeeId: string,
    dto: UpdateBankDto,
  ) {
    await this.findOne(employeeId);

    return this.prisma.employeeBank.update({
      where: {
        employeeId,
      },
      data: dto,
    });
  }

  async remove(employeeId: string) {
    await this.findOne(employeeId);

    return this.prisma.employeeBank.delete({
      where: {
        employeeId,
      },
    });
  }
}
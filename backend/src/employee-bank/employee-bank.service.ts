import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateEmployeeBankDto } from './dto/create-employee-bank.dto';
import { UpdateEmployeeBankDto } from './dto/update-employee-bank.dto';

@Injectable()
export class EmployeeBankService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    employeeId: string,
    dto: CreateEmployeeBankDto,
  ) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const existing = await this.prisma.employeeBank.findUnique({
      where: { employeeId },
    });

    if (existing) {
      throw new ConflictException(
        'Bank details already exist for this employee',
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
    return this.prisma.employeeBank.findUnique({
      where: { employeeId },
    });
  }

  async update(
    employeeId: string,
    dto: UpdateEmployeeBankDto,
  ) {
    return this.prisma.employeeBank.update({
      where: { employeeId },
      data: dto,
    });
  }

  async remove(employeeId: string) {
    return this.prisma.employeeBank.delete({
      where: { employeeId },
    });
  }
}
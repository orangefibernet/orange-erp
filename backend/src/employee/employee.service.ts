import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    const count = await this.prisma.employee.count();

    const employeeCode = `EMP${String(count + 1).padStart(6, '0')}`;

    return this.prisma.employee.create({
      data: {
        employeeCode,
        ...dto,
        joiningDate: new Date(dto.joiningDate),
        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : null,
      },
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
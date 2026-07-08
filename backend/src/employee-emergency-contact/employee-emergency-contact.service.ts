import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateEmployeeEmergencyContactDto } from './dto/create-employee-emergency-contact.dto';
import { UpdateEmployeeEmergencyContactDto } from './dto/update-employee-emergency-contact.dto';

@Injectable()
export class EmployeeEmergencyContactService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    employeeId: string,
    dto: CreateEmployeeEmergencyContactDto,
  ) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const existing =
      await this.prisma.employeeEmergencyContact.findUnique({
        where: { employeeId },
      });

    if (existing) {
      throw new ConflictException(
        'Emergency contact already exists',
      );
    }

    return this.prisma.employeeEmergencyContact.create({
      data: {
        employeeId,
        ...dto,
      },
    });
  }

  async findOne(employeeId: string) {
    return this.prisma.employeeEmergencyContact.findUnique({
      where: { employeeId },
    });
  }

  async update(
    employeeId: string,
    dto: UpdateEmployeeEmergencyContactDto,
  ) {
    return this.prisma.employeeEmergencyContact.update({
      where: { employeeId },
      data: dto,
    });
  }

  async remove(employeeId: string) {
    return this.prisma.employeeEmergencyContact.delete({
      where: { employeeId },
    });
  }
}
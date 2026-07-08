import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@Injectable()
export class EmergencyService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(employeeId: string, dto: CreateEmergencyDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    const existing =
      await this.prisma.employeeEmergencyContact.findUnique({
        where: {
          employeeId,
        },
      });

    if (existing) {
      throw new ConflictException(
        'Emergency contact already exists.',
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
    const contact =
      await this.prisma.employeeEmergencyContact.findUnique({
        where: {
          employeeId,
        },
      });

    if (!contact) {
      throw new NotFoundException(
        'Emergency contact not found.',
      );
    }

    return contact;
  }

  async update(
    employeeId: string,
    dto: UpdateEmergencyDto,
  ) {
    await this.findOne(employeeId);

    return this.prisma.employeeEmergencyContact.update({
      where: {
        employeeId,
      },
      data: dto,
    });
  }

  async remove(employeeId: string) {
    await this.findOne(employeeId);

    return this.prisma.employeeEmergencyContact.delete({
      where: {
        employeeId,
      },
    });
  }
}
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  private async generateEmployeeCode(companyId: string): Promise<string> {
    const count = await this.prisma.employee.count({
      where: {
        companyId,
      },
    });

    return `EMP${String(count + 1).padStart(6, '0')}`;
  }

  async create(companyId: string, dto: CreateEmployeeDto) {
    const employeeCode = await this.generateEmployeeCode(companyId);

    const employee = await this.prisma.employee.create({
      data: {
        companyId,
        employeeCode,

        branchId: dto.branchId,
        departmentId: dto.departmentId,
        designationId: dto.designationId,

        firstName: dto.firstName,
        lastName: dto.lastName,
        fullName: dto.fullName,

        gender: dto.gender,

        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,

        email: dto.email,
        mobile: dto.mobile,

        joiningDate: new Date(dto.joiningDate),

        confirmationDate: dto.confirmationDate
          ? new Date(dto.confirmationDate)
          : undefined,

        employmentType: dto.employmentType,

        biometricId: dto.biometricId,

        managerId: dto.managerId,

        salary: dto.salary,
      },
    });

    this.auditService.log(
      'EMPLOYEE_CREATED',
      'system',
      companyId,
      {
        employeeId: employee.id,
        employeeCode: employee.employeeCode,
        fullName: employee.fullName,
      },
    );

    return employee;
  }

  async findAll(companyId: string, query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeWhereInput = {
      companyId,
      deletedAt: null,
      ...(query.search && {
        OR: [
          {
            fullName: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
          {
            employeeCode: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        include: {
          branch: true,
          department: true,
          designation: true,
          manager: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(companyId: string, id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      include: {
        branch: true,
        department: true,
        designation: true,
        manager: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    return employee;
  }

  async update(
    companyId: string,
    id: string,
    dto: UpdateEmployeeDto,
  ) {
    await this.findOne(companyId, id);

    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        ...dto,

        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined,

        joiningDate: dto.joiningDate
          ? new Date(dto.joiningDate)
          : undefined,

        confirmationDate: dto.confirmationDate
          ? new Date(dto.confirmationDate)
          : undefined,
      },
    });

    this.auditService.log(
      'EMPLOYEE_UPDATED',
      'system',
      companyId,
      {
        employeeId: employee.id,
        employeeCode: employee.employeeCode,
      },
    );

    return employee;
  }

  async remove(companyId: string, id: string) {
    const employee = await this.findOne(companyId, id);

    const deletedEmployee = await this.prisma.employee.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    this.auditService.log(
      'EMPLOYEE_DELETED',
      'system',
      companyId,
      {
        employeeId: employee.id,
        employeeCode: employee.employeeCode,
      },
    );

    return deletedEmployee;
  }
}
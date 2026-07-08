import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CounterService } from '../counter/counter.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly counterService: CounterService,
  ) {}

  async create(
    companyId: string,
    dto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employeeCode = await this.counterService.next(
      'EMPLOYEE',
      'EMP',
    );

    return this.prisma.employee.create({
      data: {
        employeeCode,
        companyId,
        ...dto,

        joiningDate: new Date(dto.joiningDate),

        dateOfBirth: dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : null,
      },
    });
  }

  async findAll(query: QueryEmployeeDto) {
    const {
      page,
      limit,
      search,
      companyId,
      branchId,
      departmentId,
      designationId,
      sortBy,
      order,
    } = query;

    const where: Prisma.EmployeeWhereInput = {
      deletedAt: null,
    };

    if (companyId) where.companyId = companyId;
    if (branchId) where.branchId = branchId;
    if (departmentId) where.departmentId = departmentId;
    if (designationId) where.designationId = designationId;

    if (search) {
      where.OR = [
        {
          employeeCode: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          mobile: {
            contains: search,
          },
        },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
        include: {
          company: true,
          branch: true,
          department: true,
          designation: true,
        },
      }),

      this.prisma.employee.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        company: true,
        branch: true,
        department: true,
        designation: true,
        manager: true,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    return this.prisma.employee.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    return this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }
}
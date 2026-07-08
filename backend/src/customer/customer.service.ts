import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    const {
      companyId,
      branchId,
      firstName,
      lastName,
      fullName,
      ...data
    } = dto;

    const existingCustomer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { customerCode: dto.customerCode },
          { mobile: dto.mobile },
        ],
      },
    });

    if (existingCustomer) {
      throw new ConflictException(
        'Customer code or mobile already exists',
      );
    }

    return this.prisma.customer.create({
      data: {
        ...data,

        firstName,
        lastName,
        fullName:
          fullName ||
          `${firstName}${lastName ? ` ${lastName}` : ''}`,

        company: {
          connect: {
            id: companyId,
          },
        },

        branch: {
          connect: {
            id: branchId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.customer.findMany({
      include: {
        company: true,
        branch: true,
        subscriptions: true,
        connections: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        company: true,
        branch: true,
        subscriptions: true,
        connections: true,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const {
      companyId,
      branchId,
      firstName,
      lastName,
      fullName,
      ...data
    } = dto;

    return this.prisma.customer.update({
      where: { id },
      data: {
        ...data,

        ...(firstName && { firstName }),
        ...(lastName !== undefined && { lastName }),

        ...(firstName && {
          fullName:
            fullName ||
            `${firstName}${lastName ? ` ${lastName}` : ''}`,
        }),

        ...(companyId && {
          company: {
            connect: {
              id: companyId,
            },
          },
        }),

        ...(branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
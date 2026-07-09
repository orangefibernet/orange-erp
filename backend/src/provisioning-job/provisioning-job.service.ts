import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateProvisioningJobDto } from './dto/create-provisioning-job.dto';

@Injectable()
export class ProvisioningJobService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateProvisioningJobDto) {
    return this.prisma.provisioningJob.create({
      data: {
        queueJobId: dto.queueJobId,
        connectionId: dto.connectionId,
        action: dto.action,
        status: dto.status,
        payload: dto.payload,
      },
    });
  }

  async findAll() {
    return this.prisma.provisioningJob.findMany({
      include: {
        connection: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.provisioningJob.findUnique({
      where: { id },
      include: {
        connection: true,
      },
    });

    if (!job) {
      throw new NotFoundException(
        'Provisioning job not found',
      );
    }

    return job;
  }

  async updateStatus(
    id: string,
    status: string,
    response?: any,
    error?: string,
  ) {
    return this.prisma.provisioningJob.update({
      where: {
        id,
      },
      data: {
        status,
        response,
        error,
        completedAt:
          status === 'COMPLETED' ||
          status === 'FAILED'
            ? new Date()
            : undefined,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.provisioningJob.delete({
      where: {
        id,
      },
    });
  }
}
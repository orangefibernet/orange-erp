import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateNotificationDto,
  ) {
    return this.prisma.notification.create({
      data: {
        customerId: dto.customerId,
        employeeId: dto.employeeId,
        title: dto.title,
        message: dto.message,
        type: dto.type,
      },
    });
  }

  async findCustomerNotifications(
    customerId: string,
  ) {
    return this.prisma.notification.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }
}
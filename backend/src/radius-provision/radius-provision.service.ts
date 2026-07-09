import {
  Injectable,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { CreateRadiusUserDto } from './dto/create-radius-user.dto';

@Injectable()
export class RadiusProvisionService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createUser(dto: CreateRadiusUserDto) {
    const existing =
      await this.prisma.connection.findFirst({
        where: {
          pppoeUsername: dto.username,
        },
      });

    if (existing) {
      throw new ConflictException(
        'PPPoE username already exists',
      );
    }

    // FreeRADIUS integration comes next
    return {
      success: true,
      message: 'Radius user validated',
      data: dto,
    };
  }

  async updateSpeed(username: string) {
    return {
      success: true,
      username,
    };
  }

  async disableUser(username: string) {
    return {
      success: true,
      username,
    };
  }

  async deleteUser(username: string) {
    return {
      success: true,
      username,
    };
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
        ],
      },
      include: {
        company: true,
        role: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        role: true,
      },
    });
  }
}
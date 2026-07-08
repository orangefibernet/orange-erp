import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CounterService {
  constructor(private readonly prisma: PrismaService) {}

  async next(name: string, prefix: string, digits = 6): Promise<string> {
    const counter = await this.prisma.counter.upsert({
      where: { name },
      update: {
        value: {
          increment: 1,
        },
      },
      create: {
        name,
        value: 1,
      },
    });

    return `${prefix}${String(counter.value).padStart(digits, '0')}`;
  }
}
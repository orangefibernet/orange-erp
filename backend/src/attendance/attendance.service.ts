import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAttendanceDto) {
    const existing = await this.prisma.attendance.findFirst({
      where: {
        employeeId: dto.employeeId,
        attendanceDate: new Date(dto.attendanceDate),
      },
    });

    if (existing) {
      throw new ConflictException(
        'Attendance already exists for this employee and date.',
      );
    }

    return this.prisma.attendance.create({
      data: {
        employeeId: dto.employeeId,
        attendanceDate: new Date(dto.attendanceDate),
        checkIn: dto.checkIn ? new Date(dto.checkIn) : null,
        checkOut: dto.checkOut ? new Date(dto.checkOut) : null,
        workingHours: dto.workingHours,
        overtimeHours: dto.overtimeHours,
        status: dto.status,
        shift: dto.shift,
        remarks: dto.remarks,
      },
    });
  }

  async findAll(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.attendance.findMany({
        skip,
        take: limit,
        include: {
          employee: true,
        },
        orderBy: {
          attendanceDate: 'desc',
        },
      }),
      this.prisma.attendance.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });

    if (!attendance) {
      throw new NotFoundException('Attendance not found.');
    }

    return attendance;
  }

  async update(id: string, dto: UpdateAttendanceDto) {
    await this.findOne(id);

    return this.prisma.attendance.update({
      where: { id },
      data: {
        ...dto,
        attendanceDate: dto.attendanceDate
          ? new Date(dto.attendanceDate)
          : undefined,
        checkIn: dto.checkIn
          ? new Date(dto.checkIn)
          : undefined,
        checkOut: dto.checkOut
          ? new Date(dto.checkOut)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.attendance.delete({
      where: { id },
    });
  }
}
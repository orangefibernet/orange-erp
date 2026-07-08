import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateShiftDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty({ example: 'GENERAL' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'General Shift' })
  @IsString()
  name: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  graceMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  halfDayMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  overtimeAfter?: number;

  @ApiPropertyOptional({ example: 'Sunday' })
  @IsOptional()
  @IsString()
  weeklyOff?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isNightShift?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
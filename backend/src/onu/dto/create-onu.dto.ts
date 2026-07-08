import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { OnuVendor } from '@prisma/client';

export class CreateOnuDto {
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsString()
  oltId: string;

  @IsString()
  serialNumber: string;

  @IsEnum(OnuVendor)
  vendor: OnuVendor;

  @IsString()
  model: string;

  @IsInt()
  ponPort: number;

  @IsInt()
  onuId: number;

  @IsOptional()
  @IsString()
  macAddress?: string;

  @IsOptional()
  @IsNumber()
  rxPower?: number;

  @IsOptional()
  @IsNumber()
  txPower?: number;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  @IsDateString()
  installedAt?: Date;

  @IsOptional()
  @IsString()
  remarks?: string;
}
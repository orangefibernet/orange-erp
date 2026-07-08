import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { OnuVendor } from '@prisma/client';

export class CreateOnuDto {
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsUUID()
  branchId?: string;

  @IsUUID()
  oltId: string;

  @IsUUID()
  ponPortId: string;

  @IsString()
  serialNumber: string;

  @IsEnum(OnuVendor)
  vendor: OnuVendor;

  @IsString()
  model: string;

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
  installedAt?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
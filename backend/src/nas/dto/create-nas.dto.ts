import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsIP,
  IsOptional,
  IsString,
} from 'class-validator';

import { NasVendor } from '@prisma/client';

export class CreateNasDto {
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsString()
  name: string;

  @IsEnum(NasVendor)
  vendor: NasVendor;

  @IsIP()
  ipAddress: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  apiProtocol?: string;

  @IsOptional()
  @IsInt()
  apiPort?: number;

  @IsOptional()
  @IsInt()
  sshPort?: number;

  @IsOptional()
  @IsBoolean()
  radiusEnabled?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
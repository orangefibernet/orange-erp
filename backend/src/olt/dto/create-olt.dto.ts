import {
  IsEnum,
  IsIP,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { OltVendor } from '@prisma/client';

export class CreateOltDto {
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsString()
  name: string;

  @IsEnum(OltVendor)
  vendor: OltVendor;

  @IsString()
  model: string;

  @IsIP()
  managementIp: string;

  @IsOptional()
  @IsString()
  snmpCommunity?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  sshPort?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
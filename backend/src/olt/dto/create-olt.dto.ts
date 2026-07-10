import {
  IsEnum,
  IsIP,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import {
  DeviceProtocol,
  OltVendor,
} from '@prisma/client';

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
  @IsEnum(DeviceProtocol)
  protocol?: DeviceProtocol;

  @IsOptional()
  @IsInt()
  @Min(1)
  telnetPort?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  sshPort?: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  snmpCommunity?: string;

  @IsOptional()
  @IsInt()
  timeout?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
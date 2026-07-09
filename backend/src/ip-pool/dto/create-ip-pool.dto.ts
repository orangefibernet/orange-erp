import {
  IsBoolean,
  IsInt,
  IsIP,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIpPoolDto {
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  nasId?: string;

  @IsString()
  name: string;

  @IsIP()
  network: string;

  @IsInt()
  subnetMask: number;

  @IsIP()
  gateway: string;

  @IsIP()
  startIp: string;

  @IsIP()
  endIp: string;

  @IsOptional()
  @IsIP()
  dns1?: string;

  @IsOptional()
  @IsIP()
  dns2?: string;

  @IsOptional()
  @IsInt()
  vlanId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
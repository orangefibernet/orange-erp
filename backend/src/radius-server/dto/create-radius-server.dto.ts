import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsIP,
} from 'class-validator';

export class CreateRadiusServerDto {
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsString()
  name: string;

  @IsIP()
  host: string;

  @IsOptional()
  @IsInt()
  authPort?: number;

  @IsOptional()
  @IsInt()
  acctPort?: number;

  @IsOptional()
  @IsInt()
  coaPort?: number;

  @IsString()
  secret: string;

  @IsOptional()
  @IsInt()
  timeout?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
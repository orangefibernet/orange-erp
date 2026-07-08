import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  CustomerStatus,
  CustomerType,
} from '@prisma/client';

export class CreateCustomerDto {
  @IsString()
  companyId: string;

  @IsString()
  branchId: string;

  @IsString()
  customerCode: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  fullName: string;

  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  alternateMobile?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(CustomerType)
  customerType?: CustomerType;

  @IsOptional()
  @IsEnum(CustomerStatus)
  status?: CustomerStatus;

  @IsString()
  installationAddress: string;

  @IsOptional()
  @IsString()
  village?: string;

  @IsOptional()
  @IsString()
  mandal?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  remarks?: string;
}
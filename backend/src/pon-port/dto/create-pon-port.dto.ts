import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { PonPortStatus } from '@prisma/client';

export class CreatePonPortDto {
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsUUID()
  branchId?: string;

  @IsUUID()
  oltId: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  portNumber: number;

  @IsOptional()
  @IsString()
  splitter?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsEnum(PonPortStatus)
  status?: PonPortStatus;

  @IsOptional()
  @IsString()
  remarks?: string;
}
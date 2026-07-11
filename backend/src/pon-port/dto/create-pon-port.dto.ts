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

  @IsInt()
  @Min(1)
  rack: number;

  @IsInt()
  @Min(1)
  shelf: number;

  @IsInt()
  @Min(1)
  slot: number;

  @IsInt()
  @Min(1)
  portNumber: number;

  @IsString()
  name: string;

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
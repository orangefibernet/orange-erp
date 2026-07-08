import {
  IsDateString,
  IsEnum,
  IsInt,
  IsIP,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ConnectionStatus } from '@prisma/client';

export class CreateConnectionDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  subscriptionId: string;

  @IsOptional()
  @IsUUID()
  onuId?: string;

  @IsString()
  connectionNumber: string;

  @IsString()
  pppoeUsername: string;

  @IsString()
  pppoePassword: string;

  @IsOptional()
  @IsInt()
  vlanId?: number;

  @IsOptional()
  @IsIP()
  staticIp?: string;

  @IsOptional()
  @IsString()
  macAddress?: string;

  @IsOptional()
  @IsDateString()
  installationDate?: string;

  @IsOptional()
  @IsDateString()
  activationDate?: string;

  @IsOptional()
  @IsDateString()
  disconnectedDate?: string;

  @IsOptional()
  @IsString()
  installedBy?: string;

  @IsOptional()
  @IsString()
  activatedBy?: string;

  @IsOptional()
  @IsEnum(ConnectionStatus)
  status?: ConnectionStatus;

  @IsOptional()
  @IsString()
  remarks?: string;
}
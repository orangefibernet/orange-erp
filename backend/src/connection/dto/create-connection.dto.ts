import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectionStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateConnectionDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsUUID()
  subscriptionId: string;

  @ApiProperty()
  @IsString()
  pppoeUsername: string;

  @ApiProperty()
  @IsString()
  pppoePassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  oltName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ponPort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  onuSerialNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  vlanId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staticIp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  macAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  installationDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  activationDate?: string;

  @ApiPropertyOptional({
    enum: ConnectionStatus,
    default: ConnectionStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ConnectionStatus)
  status?: ConnectionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remarks?: string;
}
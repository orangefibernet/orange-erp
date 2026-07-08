import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ProvisionCustomerDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  subscriptionId: string;

  @IsOptional()
  @IsUUID()
  onuId?: string;

  @IsOptional()
  @IsString()
  pppoeUsername?: string;

  @IsOptional()
  @IsString()
  pppoePassword?: string;

  @IsOptional()
  @IsString()
  staticIp?: string;

  @IsOptional()
  vlanId?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
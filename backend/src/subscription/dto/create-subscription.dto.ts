import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  BillingCycle,
  SubscriptionStatus,
} from '@prisma/client';

export class CreateSubscriptionDto {
  @IsString()
  customerId: string;

  @IsString()
  packageId: string;

  @IsNumber()
  monthlyPrice: number;

  @IsOptional()
  @IsNumber()
  installationCharge?: number;

  @IsOptional()
  @IsNumber()
  securityDeposit?: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @IsInt()
  billingDay: number;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @IsOptional()
  @IsString()
  remarks?: string;
}
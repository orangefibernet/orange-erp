import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBillingDto {
  @IsString()
  subscriptionId: string;

  @IsInt()
  billingMonth: number;

  @IsInt()
  billingYear: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
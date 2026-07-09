import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  BillingCycle,
  PackageType,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreatePackageDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: PackageType })
  @IsEnum(PackageType)
  packageType: PackageType;

  @ApiProperty()
  @IsInt()
  @Min(1)
  downloadMbps: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  uploadMbps: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  burstDownloadMbps?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  burstUploadMbps?: number;

  @ApiProperty()
  @IsNumber()
  monthlyPrice: number;

  @ApiPropertyOptional({ default: 18 })
  @IsOptional()
  @IsNumber()
  @Max(100)
  gstPercentage?: number;

  @ApiPropertyOptional({ enum: BillingCycle })
  @IsOptional()
  @IsEnum(BillingCycle)
  billingCycle?: BillingCycle;

  @ApiPropertyOptional({ default: 30 })
  @IsOptional()
  @IsInt()
  validityDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  fupLimitGb?: number;

  // ==========================
  // Provisioning
  // ==========================

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  radiusGroup?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mikrotikProfile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ciscoPolicy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  huaweiProfile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zteProfile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nokiaProfile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ipPool?: string;

  @ApiPropertyOptional({ default: 8 })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  simultaneousUse?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sessionTimeout?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  idleTimeout?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
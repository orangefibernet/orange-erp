import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Orange Fibernet Pvt Ltd',
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'ORANGE',
  })
  @IsString()
  @Length(2, 20)
  code: string;

  @ApiProperty({
    required: false,
    example: 'info@orangefibernet.in',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    example: '+91XXXXXXXXXX',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
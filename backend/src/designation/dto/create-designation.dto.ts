import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateDesignationDto {
  @ApiProperty({
    example: 'TECH',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Field Technician',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

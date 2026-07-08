import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDocumentDto {
  @ApiProperty({
    example: 'AADHAAR',
    description: 'Document type',
  })
  @IsString()
  documentType: string;

  @ApiPropertyOptional({
    example: 'Front side of Aadhaar card',
  })
  @IsOptional()
  @IsString()
  remarks?: string;
}
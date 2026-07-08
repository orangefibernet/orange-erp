import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    example: '1572a337-75d1-450d-9fd5-ea269ae00a76',
  })
  @IsUUID()
  branchId: string;

  @ApiProperty({
    example: 'HR',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Human Resources',
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

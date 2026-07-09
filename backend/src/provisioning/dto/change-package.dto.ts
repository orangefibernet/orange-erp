import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePackageDto {
  @ApiProperty()
  @IsUUID()
  subscriptionId: string;
}
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RebootOnuDto {
  @IsString()
  @IsNotEmpty()
  interfaceName: string;
}
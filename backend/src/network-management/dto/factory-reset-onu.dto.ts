import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class FactoryResetOnuDto {
  @IsString()
  @IsNotEmpty()
  interfaceName: string;
}
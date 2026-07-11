import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ToggleOnuDto {
  @IsString()
  @IsNotEmpty()
  interfaceName: string;
}
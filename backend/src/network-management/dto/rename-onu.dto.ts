import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class RenameOnuDto {
  @IsString()
  @IsNotEmpty()
  interfaceName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}
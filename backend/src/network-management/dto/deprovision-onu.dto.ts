import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class DeprovisionOnuDto {
  @IsString()
  @IsNotEmpty()
  ponPort: string;

  @IsInt()
  @Min(1)
  onuId: number;
}
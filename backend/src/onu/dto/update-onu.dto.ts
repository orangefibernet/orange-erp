import { PartialType } from '@nestjs/swagger';
import { CreateOnuDto } from './create-onu.dto';

export class UpdateOnuDto extends PartialType(CreateOnuDto) {}
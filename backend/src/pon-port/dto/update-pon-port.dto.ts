import { PartialType } from '@nestjs/swagger';
import { CreatePonPortDto } from './create-pon-port.dto';

export class UpdatePonPortDto extends PartialType(CreatePonPortDto) {}
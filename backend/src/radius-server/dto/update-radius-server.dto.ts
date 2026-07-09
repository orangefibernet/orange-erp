import { PartialType } from '@nestjs/mapped-types';
import { CreateRadiusServerDto } from './create-radius-server.dto';

export class UpdateRadiusServerDto extends PartialType(CreateRadiusServerDto) {}
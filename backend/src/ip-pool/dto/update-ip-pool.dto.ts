import { PartialType } from '@nestjs/mapped-types';
import { CreateIpPoolDto } from './create-ip-pool.dto';

export class UpdateIpPoolDto extends PartialType(CreateIpPoolDto) {}
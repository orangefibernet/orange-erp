import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CreateRadiusUserDto } from './dto/create-radius-user.dto';
import { RadiusProvisionService } from './radius-provision.service';

@Controller('radius')
export class RadiusProvisionController {
  constructor(
    private readonly radiusService: RadiusProvisionService,
  ) {}

  @Post('user')
  create(
    @Body()
    dto: CreateRadiusUserDto,
  ) {
    return this.radiusService.createUser(dto);
  }
}
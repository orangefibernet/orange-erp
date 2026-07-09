import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { RadiusService } from './radius.service';

@Controller('radius')
export class RadiusController {
  constructor(private readonly radiusService: RadiusService) {}

  @Get()
  list() {
    return this.radiusService.listUsers();
  }

  @Get(':username')
  get(@Param('username') username: string) {
    return this.radiusService.findUser(username);
  }

  @Post()
  create(
    @Body()
    body: {
      username: string;
      password: string;
    },
  ) {
    return this.radiusService.createUser(
      body.username,
      body.password,
    );
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.radiusService.deleteUser(username);
  }
}
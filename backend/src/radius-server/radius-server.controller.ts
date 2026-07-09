import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RadiusServerService } from './radius-server.service';
import { CreateRadiusServerDto } from './dto/create-radius-server.dto';
import { UpdateRadiusServerDto } from './dto/update-radius-server.dto';

@Controller('radius-server')
export class RadiusServerController {
  constructor(
    private readonly radiusServerService: RadiusServerService,
  ) {}

  @Post()
  create(@Body() dto: CreateRadiusServerDto) {
    return this.radiusServerService.create(dto);
  }

  @Get()
  findAll() {
    return this.radiusServerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radiusServerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRadiusServerDto,
  ) {
    return this.radiusServerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radiusServerService.remove(id);
  }
}
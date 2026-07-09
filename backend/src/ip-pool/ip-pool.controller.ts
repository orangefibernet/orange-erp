import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateIpPoolDto } from './dto/create-ip-pool.dto';
import { UpdateIpPoolDto } from './dto/update-ip-pool.dto';
import { IpPoolService } from './ip-pool.service';

@Controller('ip-pool')
export class IpPoolController {
  constructor(
    private readonly ipPoolService: IpPoolService,
  ) {}

  @Post()
  create(@Body() dto: CreateIpPoolDto) {
    return this.ipPoolService.create(dto);
  }

  @Get()
  findAll() {
    return this.ipPoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipPoolService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIpPoolDto,
  ) {
    return this.ipPoolService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipPoolService.remove(id);
  }
}
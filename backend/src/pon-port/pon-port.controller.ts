import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PonPortService } from './pon-port.service';
import { CreatePonPortDto } from './dto/create-pon-port.dto';
import { UpdatePonPortDto } from './dto/update-pon-port.dto';

@ApiTags('PON Ports')
@Controller('pon-ports')
export class PonPortController {
  constructor(private readonly ponPortService: PonPortService) {}

  @Post()
  @ApiOperation({ summary: 'Create PON Port' })
  create(@Body() dto: CreatePonPortDto) {
    return this.ponPortService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all PON Ports' })
  findAll() {
    return this.ponPortService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get PON Port by ID' })
  findOne(@Param('id') id: string) {
    return this.ponPortService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update PON Port' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePonPortDto,
  ) {
    return this.ponPortService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete PON Port' })
  remove(@Param('id') id: string) {
    return this.ponPortService.remove(id);
  }
}
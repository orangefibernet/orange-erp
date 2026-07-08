import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { NasService } from './nas.service';
import { CreateNasDto } from './dto/create-nas.dto';
import { UpdateNasDto } from './dto/update-nas.dto';

@ApiTags('NAS')
@Controller('nas')
export class NasController {
  constructor(
    private readonly nasService: NasService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create NAS' })
  create(
    @Body() dto: CreateNasDto,
  ) {
    return this.nasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All NAS Devices' })
  findAll() {
    return this.nasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get NAS By Id' })
  findOne(
    @Param('id') id: string,
  ) {
    return this.nasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update NAS' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNasDto,
  ) {
    return this.nasService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete NAS' })
  remove(
    @Param('id') id: string,
  ) {
    return this.nasService.remove(id);
  }
}
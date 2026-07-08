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

import { OnuService } from './onu.service';
import { CreateOnuDto } from './dto/create-onu.dto';
import { UpdateOnuDto } from './dto/update-onu.dto';

@ApiTags('ONU')
@Controller('onu')
export class OnuController {
  constructor(private readonly onuService: OnuService) {}

  @Post()
  @ApiOperation({ summary: 'Create ONU' })
  create(@Body() dto: CreateOnuDto) {
    return this.onuService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ONUs' })
  findAll() {
    return this.onuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ONU by ID' })
  findOne(@Param('id') id: string) {
    return this.onuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ONU' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOnuDto,
  ) {
    return this.onuService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ONU' })
  remove(@Param('id') id: string) {
    return this.onuService.remove(id);
  }
}
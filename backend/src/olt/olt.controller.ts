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

import { OltService } from './olt.service';
import { CreateOltDto } from './dto/create-olt.dto';
import { UpdateOltDto } from './dto/update-olt.dto';

@ApiTags('OLT')
@Controller('olt')
export class OltController {
  constructor(private readonly oltService: OltService) {}

  @Post()
  @ApiOperation({ summary: 'Create OLT' })
  create(@Body() dto: CreateOltDto) {
    return this.oltService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all OLTs' })
  findAll() {
    return this.oltService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get OLT by ID' })
  findOne(@Param('id') id: string) {
    return this.oltService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update OLT' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOltDto,
  ) {
    return this.oltService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete OLT' })
  remove(@Param('id') id: string) {
    return this.oltService.remove(id);
  }
}
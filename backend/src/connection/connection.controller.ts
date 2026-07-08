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

import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@ApiTags('Connections')
@Controller('connections')
export class ConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Connection' })
  create(@Body() dto: CreateConnectionDto) {
    return this.connectionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List Connections' })
  findAll() {
    return this.connectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Connection' })
  findOne(@Param('id') id: string) {
    return this.connectionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Connection' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateConnectionDto,
  ) {
    return this.connectionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Connection' })
  remove(@Param('id') id: string) {
    return this.connectionService.remove(id);
  }
}
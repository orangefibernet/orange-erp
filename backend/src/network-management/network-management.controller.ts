import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { NetworkManagementService } from './network-management.service';

@Controller('network-management')
export class NetworkManagementController {
  constructor(
    private readonly service: NetworkManagementService,
  ) {}

  @Get('olt/:id/cards')
  getCards(
    @Param('id') id: string,
  ) {
    return this.service.getCards(id);
  }

  @Get('olt/:id/test')
  testConnection(
    @Param('id') id: string,
  ) {
    return this.service.testConnection(id);
  }

  @Post('olt/:id/sync/cards')
  syncCards(
    @Param('id') id: string,
  ) {
    return this.service.syncCards(id);
  }

  @Post('olt/:id/sync/pon-ports')
  syncPonPorts(
    @Param('id') id: string,
  ) {
    return this.service.syncPonPorts(id);
  }

  @Post('olt/:id/sync/onus')
  syncOnus(
    @Param('id') id: string,
  ) {
    return this.service.syncOnus(id);
  }
}
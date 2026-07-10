import {
  Controller,
  Get,
  Param,
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
}
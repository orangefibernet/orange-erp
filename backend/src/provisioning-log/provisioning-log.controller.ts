import { Controller, Delete, Get, Param } from '@nestjs/common';

import { ProvisioningLogService } from './provisioning-log.service';

@Controller('provisioning-logs')
export class ProvisioningLogController {
  constructor(
    private readonly provisioningLogService: ProvisioningLogService,
  ) {}

  @Get()
  findAll() {
    return this.provisioningLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provisioningLogService.findOne(id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.provisioningLogService.findByCustomer(customerId);
  }

  @Get('connection/:connectionId')
  findByConnection(@Param('connectionId') connectionId: string) {
    return this.provisioningLogService.findByConnection(connectionId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provisioningLogService.remove(id);
  }
}
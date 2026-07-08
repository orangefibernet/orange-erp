import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProvisioningService } from './provisioning.service';
import { ProvisionCustomerDto } from './dto/provision-customer.dto';

@ApiTags('Provisioning')
@Controller('provisioning')
export class ProvisioningController {
  constructor(
    private readonly provisioningService: ProvisioningService,
  ) {}

  @Post('customer')
  @ApiOperation({
    summary: 'Provision a customer connection',
  })
  provision(@Body() dto: ProvisionCustomerDto) {
    return this.provisioningService.provision(dto);
  }
}
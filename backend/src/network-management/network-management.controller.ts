import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { FactoryResetOnuDto } from './dto/factory-reset-onu.dto';
import { NetworkManagementService } from './network-management.service';
import { Body } from '@nestjs/common';
import { ProvisionOnuDto } from './dto/provision-onu.dto';
import { RebootOnuDto } from './dto/reboot-onu.dto';
import { DeprovisionOnuDto } from './dto/deprovision-onu.dto';
import { ToggleOnuDto } from './dto/toggle-onu.dto';
import { RenameOnuDto } from './dto/rename-onu.dto';
@Controller('network-management')
export class NetworkManagementController {
  constructor(
    private readonly service: NetworkManagementService,
  ) {}

  /**
   * Test OLT connection
   */
  @Get('olt/:id/test')
  testConnection(
    @Param('id') id: string,
  ) {
    return this.service.testConnection(id);
  }

  /**
   * Get OLT cards
   */
  @Get('olt/:id/cards')
  getCards(
    @Param('id') id: string,
  ) {
    return this.service.getCards(id);
  }

  /**
   * Get ONU states
   */
  @Get('olt/:id/onus')
  getOnuStates(
    @Param('id') id: string,
  ) {
    return this.service.getOnuStates(id);
  }

  /**
   * Get ONU detail
   */
  @Get('olt/:id/onus/:interfaceName/detail')
  getOnuDetail(
    @Param('id') id: string,
    @Param('interfaceName')
    interfaceName: string,
  ) {
    return this.service.getOnuDetail(
      id,
      interfaceName,
    );
  }

@Post('olt/:id/onus/factory-reset')
factoryResetOnu(
  @Param('id') id: string,
  @Body() dto: FactoryResetOnuDto,
) {
  return this.service.factoryResetOnu(
    id,
    dto,
  );
}

  /**
   * Get ONU optical power
   */
  @Get(
    'olt/:id/onus/:interfaceName/optical-power',
  )
  getOpticalPower(
    @Param('id') id: string,
    @Param('interfaceName')
    interfaceName: string,
  ) {
    return this.service.getOpticalPower(
      id,
      interfaceName,
    );
  }

  /**
   * Sync cards
   */
  @Post('olt/:id/sync/cards')
  syncCards(
    @Param('id') id: string,
  ) {
    return this.service.syncCards(id);
  }

  /**
   * Sync PON ports
   */
  @Post('olt/:id/sync/pon-ports')
  syncPonPorts(
    @Param('id') id: string,
  ) {
    return this.service.syncPonPorts(id);
  }

  /**
   * Sync ONUs
   */
  @Post('olt/:id/sync/onus')
  syncOnus(
    @Param('id') id: string,
  ) {
    return this.service.syncOnus(id);
  }
  /**
 * Get unconfigured ONUs.
 */
@Get('olt/:id/onus/unconfigured')
getUnconfiguredOnus(
  @Param('id') id: string,
) {
  return this.service.getUnconfiguredOnus(
    id,
  );
}
@Post('olt/:id/onus/provision')
provisionOnu(
  @Param('id') id: string,
  @Body() dto: ProvisionOnuDto,
) {
  return this.service.provisionOnu(
    id,
    dto,
  );
}
@Post('olt/:id/onus/reboot')
rebootOnu(
  @Param('id') id: string,
  @Body() dto: RebootOnuDto,
) {
  return this.service.rebootOnu(
    id,
    dto,
  );
}

@Post('olt/:id/onus/deprovision')
deprovisionOnu(
  @Param('id') id: string,
  @Body() dto: DeprovisionOnuDto,
) {
  return this.service.deprovisionOnu(
    id,
    dto,
  );
}

@Post('olt/:id/onus/enable')
enableOnu(
  @Param('id') id: string,
  @Body() dto: ToggleOnuDto,
) {
  return this.service.enableOnu(
    id,
    dto,
  );
}

@Post('olt/:id/onus/disable')
disableOnu(
  @Param('id') id: string,
  @Body() dto: ToggleOnuDto,
) {
  return this.service.disableOnu(
    id,
    dto,
  );
}

@Post('olt/:id/onus/rename')
renameOnu(
  @Param('id') id: string,
  @Body() dto: RenameOnuDto,
) {
  return this.service.renameOnu(
    id,
    dto,
  );
}

}
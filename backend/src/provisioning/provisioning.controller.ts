import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { ChangePackageDto } from './dto/change-package.dto';
import { ProvisioningService } from './provisioning.service';

@Controller('provisioning')
export class ProvisioningController {
  constructor(
    private readonly provisioningService: ProvisioningService,
  ) {}

  @Post(':connectionId/activate')
  activate(
    @Param('connectionId') connectionId: string,
  ) {
    return this.provisioningService.activate(
      connectionId,
    );
  }

  @Post(':connectionId/suspend')
  suspend(
    @Param('connectionId') connectionId: string,
  ) {
    return this.provisioningService.suspend(
      connectionId,
    );
  }

  @Post(':connectionId/resume')
  resume(
    @Param('connectionId') connectionId: string,
  ) {
    return this.provisioningService.resume(
      connectionId,
    );
  }

  @Post(':connectionId/disconnect')
  disconnect(
    @Param('connectionId') connectionId: string,
  ) {
    return this.provisioningService.disconnect(
      connectionId,
    );
  }

  @Post(':connectionId/change-package')
  changePackage(
    @Param('connectionId') connectionId: string,
    @Body() dto: ChangePackageDto,
  ) {
    return this.provisioningService.changePackage(
      connectionId,
      dto.subscriptionId,
    );
  }
}
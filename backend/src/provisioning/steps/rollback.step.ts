import { Injectable } from '@nestjs/common';

import { RadiusService } from '../../radius/radius.service';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class RollbackStep
  implements ProvisioningStep
{
  constructor(
    private readonly radiusService: RadiusService,
  ) {}

  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    if (!context.connection) {
      return;
    }

    try {
      await this.radiusService.deleteUser(
        context.connection.pppoeUsername,
      );
    } catch {
      // Ignore rollback failures
    }
  }
}
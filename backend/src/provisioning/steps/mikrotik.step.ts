import { Injectable, Logger } from '@nestjs/common';

import { NetworkService } from '../../network/network.service';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class MikrotikStep implements ProvisioningStep {
  private readonly logger = new Logger(MikrotikStep.name);

  constructor(
    private readonly networkService: NetworkService,
  ) {}

  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    if (!context.connection) {
      throw new Error('Connection not loaded.');
    }

    if (!context.connection.nasId) {
      this.logger.warn(
        'No NAS assigned. Skipping MikroTik provisioning.',
      );
      return;
    }

    const adapter = await this.networkService.getAdapter(
      context.connection.nasId,
    );

    await adapter.connect(context.connection.nasId);

    try {
      await adapter.createUser(
        context.connection.pppoeUsername,
        context.connection.pppoePassword,
        context.radiusGroup,
      );
    } finally {
      await adapter.disconnect();
    }

    this.logger.log(
      `Provisioned MikroTik user ${context.connection.pppoeUsername}`,
    );
  }
}
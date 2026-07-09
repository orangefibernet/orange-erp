import { Injectable } from '@nestjs/common';

import { RadiusService } from '../../radius/radius.service';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class RadiusStep implements ProvisioningStep {
  constructor(
    private readonly radiusService: RadiusService,
  ) {}

  private buildRadiusGroupName(code: string): string {
    return code
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_');
  }

  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    if (!context.connection) {
      throw new Error('Connection not loaded.');
    }

    const username = context.connection.pppoeUsername;
    const password = context.connection.pppoePassword;

    const existingUser =
      await this.radiusService.findUser(username);

    if (existingUser.length === 0) {
      await this.radiusService.createUser(
        username,
        password,
      );
    }

    const groupName = this.buildRadiusGroupName(
      context.connection.subscription.package.code,
    );

    await this.radiusService.changeGroup(
      username,
      groupName,
    );

    context.radiusGroup = groupName;
  }
}
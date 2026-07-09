import { Injectable } from '@nestjs/common';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class AllocateIpStep
  implements ProvisioningStep
{
  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    // Will integrate with IpAllocationService
    context.ipAddress = null;
  }
}
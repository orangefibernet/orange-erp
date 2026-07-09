import { Injectable } from '@nestjs/common';
import {
  ProvisioningAction,
  ProvisioningStatus,
} from '@prisma/client';

import { ProvisioningLogService } from '../../provisioning-log/provisioning-log.service';

import {
  ProvisioningContext,
  ProvisioningStep,
} from './provisioning-step.interface';

@Injectable()
export class LogStep
  implements ProvisioningStep
{
  constructor(
    private readonly logService: ProvisioningLogService,
  ) {}

  async execute(
    context: ProvisioningContext,
  ): Promise<void> {
    await this.logService.create({
      customerId:
        context.connection.customerId,
      connectionId:
        context.connection.id,
      action:
        ProvisioningAction.CREATE_RADIUS_USER,
      status: context.success
        ? ProvisioningStatus.SUCCESS
        : ProvisioningStatus.FAILED,
      message: context.success
        ? 'Provisioning completed successfully.'
        : context.errors.join('\n'),
      executedBy: 'SYSTEM',
    });
  }
}
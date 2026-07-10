import {
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import {
  ConnectionStatus,
  ProvisioningAction,
  ProvisioningStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { IpAllocationService } from '../../ip-allocation/ip-allocation.service';
import { RadiusService } from '../../radius/radius.service';
import { NetworkService } from '../../network/network.service';
import { NetworkSessionService } from '../../network-session/network-session.service';
import { ProvisioningLogService } from '../../provisioning-log/provisioning-log.service';

import { ProvisioningContextService } from './provisioning-context.service';

@Injectable()
export class ProvisioningEngineService {
  private readonly logger = new Logger(
    ProvisioningEngineService.name,
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly contextService: ProvisioningContextService,
    private readonly ipAllocationService: IpAllocationService,
    private readonly radiusService: RadiusService,
    private readonly networkService: NetworkService,
    private readonly networkSessionService: NetworkSessionService,
    private readonly provisioningLogService: ProvisioningLogService,
  ) {}

  async activate(
    connectionId: string,
  ) {
    const context =
      await this.contextService.load(
        connectionId,
      );

    if (
      context.connection.status ===
      ConnectionStatus.ACTIVE
    ) {
      throw new BadRequestException(
        'Connection is already active.',
      );
    }

    this.logger.log(
      `Activating ${context.connection.connectionNumber}`,
    );

    if (
      context.package.ipPool &&
      !context.allocatedIp
    ) {
      await this.ipAllocationService.allocate(
        context.package.ipPool,
        context.customer.id,
        context.connection.id,
      );
    }

    if (context.package.radiusGroup) {
      await this.radiusService.provisionUser(
        context.connection.pppoeUsername,
        context.connection.pppoePassword,
        context.package.radiusGroup,
      );
    }

    if (
      context.nas &&
      context.package.mikrotikProfile
    ) {
      await this.networkService.createPppoeUser(
        context.nas.id,
        context.connection.pppoeUsername,
        context.connection.pppoePassword,
        context.package.mikrotikProfile,
      );

      await this.networkService.enablePppoeUser(
        context.nas.id,
        context.connection.pppoeUsername,
      );

      await this.networkSessionService.disconnectPppoeUser(
        context.nas.id,
        context.connection.pppoeUsername,
      );
    }

    await this.prisma.connection.update({
      where: {
        id: context.connection.id,
      },
      data: {
        status: ConnectionStatus.ACTIVE,
        activationDate: new Date(),
      },
    });

    await this.provisioningLogService.create({
      customerId: context.customer.id,
      connectionId: context.connection.id,
      action: ProvisioningAction.ACTIVATE,
      status: ProvisioningStatus.SUCCESS,
      message: 'Subscriber activated successfully.',
    });

    this.logger.log(
      `Activation completed for ${context.connection.connectionNumber}`,
    );

    return {
      success: true,
      connectionId: context.connection.id,
    };
  }

  async suspend(
  connectionId: string,
) {
  const context =
    await this.contextService.load(
      connectionId,
    );

  if (
    context.connection.status ===
    ConnectionStatus.SUSPENDED
  ) {
    throw new BadRequestException(
      'Connection is already suspended.',
    );
  }

  this.logger.log(
    `Suspending ${context.connection.connectionNumber}`,
  );

  // Disable MikroTik PPPoE user
  if (context.nas) {
    await this.networkService.disablePppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );

    // Disconnect active PPPoE session
    await this.networkSessionService.disconnectPppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );
  }

  // Suspend RADIUS authentication
  await this.radiusService.suspendUser(
    context.connection.pppoeUsername,
  );

  // Update database
  await this.prisma.connection.update({
    where: {
      id: context.connection.id,
    },
    data: {
      status: ConnectionStatus.SUSPENDED,
    },
  });

  // Log
  await this.provisioningLogService.create({
    customerId: context.customer.id,
    connectionId: context.connection.id,
    action: ProvisioningAction.SUSPEND,
    status: ProvisioningStatus.SUCCESS,
    message: 'Subscriber suspended successfully.',
  });

  this.logger.log(
    `Suspend completed for ${context.connection.connectionNumber}`,
  );

  return {
    success: true,
    connectionId: context.connection.id,
  };
}

  async resume(
  connectionId: string,
) {
  const context =
    await this.contextService.load(
      connectionId,
    );

  if (
    context.connection.status ===
    ConnectionStatus.ACTIVE
  ) {
    throw new BadRequestException(
      'Connection is already active.',
    );
  }

  this.logger.log(
    `Resuming ${context.connection.connectionNumber}`,
  );

  // Restore RADIUS provisioning
  if (context.package.radiusGroup) {
    await this.radiusService.provisionUser(
      context.connection.pppoeUsername,
      context.connection.pppoePassword,
      context.package.radiusGroup,
    );
  }

  // Enable MikroTik user
  if (context.nas) {
    await this.networkService.enablePppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );

    // Force reconnect so new policies apply
    await this.networkSessionService.disconnectPppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );
  }

  await this.prisma.connection.update({
    where: {
      id: context.connection.id,
    },
    data: {
      status: ConnectionStatus.ACTIVE,
    },
  });

  await this.provisioningLogService.create({
    customerId: context.customer.id,
    connectionId: context.connection.id,
    action: ProvisioningAction.ACTIVATE,
    status: ProvisioningStatus.SUCCESS,
    message: 'Subscriber resumed successfully.',
  });

  this.logger.log(
    `Resume completed for ${context.connection.connectionNumber}`,
  );

  return {
    success: true,
    connectionId: context.connection.id,
  };
}

  async disconnect(
  connectionId: string,
) {
  const context =
    await this.contextService.load(
      connectionId,
    );

  if (
    context.connection.status ===
    ConnectionStatus.DISCONNECTED
  ) {
    throw new BadRequestException(
      'Connection is already disconnected.',
    );
  }

  this.logger.log(
    `Disconnecting ${context.connection.connectionNumber}`,
  );

  // Remove PPPoE user from MikroTik
  if (context.nas) {
    await this.networkService.deletePppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );
  }

  // Remove user from FreeRADIUS
  await this.radiusService.deprovisionUser(
    context.connection.pppoeUsername,
  );

  // Release allocated IP
  await this.ipAllocationService.releaseByConnection(
    context.connection.id,
  );

  // Update database
  await this.prisma.connection.update({
    where: {
      id: context.connection.id,
    },
    data: {
      status: ConnectionStatus.DISCONNECTED,
      disconnectedDate: new Date(),
    },
  });

  // Log
  await this.provisioningLogService.create({
    customerId: context.customer.id,
    connectionId: context.connection.id,
    action: ProvisioningAction.TERMINATE,
    status: ProvisioningStatus.SUCCESS,
    message: 'Subscriber disconnected successfully.',
  });

  this.logger.log(
    `Disconnect completed for ${context.connection.connectionNumber}`,
  );

  return {
    success: true,
    connectionId: context.connection.id,
  };
}

  async changePackage(
  connectionId: string,
  subscriptionId: string,
) {
  const context =
    await this.contextService.load(
      connectionId,
    );

  this.logger.log(
    `Changing package for ${context.connection.connectionNumber}`,
  );

  const subscription =
    await this.prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
      include: {
        package: true,
      },
    });

  if (!subscription) {
    throw new BadRequestException(
      'Subscription not found.',
    );
  }

  // Update subscription
  await this.prisma.connection.update({
    where: {
      id: context.connection.id,
    },
    data: {
      subscriptionId,
    },
  });

  // Update FreeRADIUS group
  if (subscription.package.radiusGroup) {
    await this.radiusService.changeGroup(
      context.connection.pppoeUsername,
      subscription.package.radiusGroup,
    );
  }

  // Update MikroTik profile
  if (
    context.nas &&
    subscription.package.mikrotikProfile
  ) {
    await this.networkService.changePppoeProfile(
      context.nas.id,
      context.connection.pppoeUsername,
      subscription.package.mikrotikProfile,
    );

    // Force reconnect
    await this.networkSessionService.disconnectPppoeUser(
      context.nas.id,
      context.connection.pppoeUsername,
    );
  }

  await this.provisioningLogService.create({
    customerId: context.customer.id,
    connectionId: context.connection.id,
    action: ProvisioningAction.ASSIGN_RADIUS_GROUP,
    status: ProvisioningStatus.SUCCESS,
    message: `Package changed to ${subscription.package.name}`,
  });

  this.logger.log(
    `Package changed successfully for ${context.connection.connectionNumber}`,
  );

  return {
    success: true,
    connectionId: context.connection.id,
    subscriptionId,
  };
}
}
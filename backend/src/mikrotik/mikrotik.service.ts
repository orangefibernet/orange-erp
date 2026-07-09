import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { ProvisioningLogService } from '../provisioning-log/provisioning-log.service';

@Injectable()
export class MikrotikService {
  private readonly logger = new Logger(MikrotikService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly provisioningLogService: ProvisioningLogService,
  ) {}

  async connect(nasId: string) {
    const nas = await this.prisma.nas.findUnique({
      where: {
        id: nasId,
      },
    });

    if (!nas) {
      throw new Error('NAS not found');
    }

    this.logger.log(
      `Connecting to MikroTik ${nas.name} (${nas.ipAddress})`,
    );

    return nas;
  }

  async createPppoeUser(
    nasId: string,
    username: string,
    password: string,
    profile: string,
  ) {
    await this.connect(nasId);

    this.logger.log(
      `Creating PPPoE user ${username}`,
    );

    // RouterOS API implementation will be added next.
    return {
      success: true,
    };
  }

  async updatePppoePassword(
    nasId: string,
    username: string,
    password: string,
  ) {
    await this.connect(nasId);

    this.logger.log(
      `Updating password for ${username}`,
    );

    return {
      success: true,
    };
  }

  async enableUser(
    nasId: string,
    username: string,
  ) {
    await this.connect(nasId);

    this.logger.log(
      `Enabling ${username}`,
    );

    return {
      success: true,
    };
  }

  async disableUser(
    nasId: string,
    username: string,
  ) {
    await this.connect(nasId);

    this.logger.log(
      `Disabling ${username}`,
    );

    return {
      success: true,
    };
  }

  async deleteUser(
    nasId: string,
    username: string,
  ) {
    await this.connect(nasId);

    this.logger.log(
      `Deleting ${username}`,
    );

    return {
      success: true,
    };
  }
}
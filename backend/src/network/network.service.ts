import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NasVendor } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

import { MikrotikAdapter } from './adapters/mikrotik.adapter';
import { NetworkDevice } from './interfaces/network-device.interface';

@Injectable()
export class NetworkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mikrotikAdapter: MikrotikAdapter,
  ) {}

  async getAdapter(
    nasId: string,
  ): Promise<NetworkDevice> {
    const nas = await this.prisma.nas.findUnique({
      where: {
        id: nasId,
      },
    });

    if (!nas) {
      throw new NotFoundException(
        'NAS not found',
      );
    }

    switch (nas.vendor) {
      case NasVendor.MIKROTIK:
        return this.mikrotikAdapter;

      case NasVendor.CISCO:
        throw new Error(
          'Cisco adapter not implemented yet.',
        );

      case NasVendor.JUNIPER:
        throw new Error(
          'Juniper adapter not implemented yet.',
        );

      case NasVendor.HUAWEI:
        throw new Error(
          'Huawei adapter not implemented yet.',
        );

      default:
        throw new Error(
          `Unsupported NAS vendor: ${nas.vendor}`,
        );
    }
  }

  async createPppoeUser(
    nasId: string,
    username: string,
    password: string,
    profile = 'default',
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.createUser(
        username,
        password,
        profile,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async updatePppoePassword(
    nasId: string,
    username: string,
    password: string,
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.updatePassword(
        username,
        password,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async changePppoeProfile(
    nasId: string,
    username: string,
    profile: string,
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.changeProfile(
        username,
        profile,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async enablePppoeUser(
    nasId: string,
    username: string,
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.enableUser(
        username,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async disablePppoeUser(
    nasId: string,
    username: string,
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.disableUser(
        username,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async deletePppoeUser(
    nasId: string,
    username: string,
  ) {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      await adapter.deleteUser(
        username,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async disconnectPppoeUser(
    nasId: string,
    username: string,
  ): Promise<boolean> {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      return await adapter.disconnectUser(
        username,
      );
    } finally {
      await adapter.disconnect();
    }
  }

  async testNasConnection(
    nasId: string,
  ): Promise<boolean> {
    const adapter =
      await this.getAdapter(nasId);

    await adapter.connect(nasId);

    try {
      return await adapter.testConnection();
    } finally {
      await adapter.disconnect();
    }
  }
}
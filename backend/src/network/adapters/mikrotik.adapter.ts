import { Injectable } from '@nestjs/common';
import { RouterOSAPI } from 'node-routeros';

import { NetworkSessionService } from '../../network-session/network-session.service';
import { NetworkDevice } from '../interfaces/network-device.interface';

@Injectable()
export class MikrotikAdapter implements NetworkDevice {
  private api?: RouterOSAPI;

  constructor(
    private readonly sessionService: NetworkSessionService,
  ) {}

  async connect(nasId: string): Promise<void> {
    this.api =
      await this.sessionService.createMikrotikSession(
        nasId,
      );
  }

  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.close();
      this.api = undefined;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.api) {
      return false;
    }

    try {
      const result = await this.api.write(
        '/system/identity/print',
      );

      return result.length > 0;
    } catch {
      return false;
    }
  }

  private async findSecret(
    username: string,
  ): Promise<string | null> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    const result = await this.api.write(
      '/ppp/secret/print',
      `?name=${username}`,
    );

    if (result.length === 0) {
      return null;
    }

    return result[0]['.id'] ?? null;
  }

  private async findActiveSession(
    username: string,
  ): Promise<string | null> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    const result = await this.api.write(
      '/ppp/active/print',
      `?name=${username}`,
    );

    if (result.length === 0) {
      return null;
    }

    return result[0]['.id'] ?? null;
  }

  async createUser(
    username: string,
    password: string,
    profile = 'default',
  ): Promise<void> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    const secretId =
      await this.findSecret(username);

    if (secretId) {
      await this.api.write(
        '/ppp/secret/set',
        `=.id=${secretId}`,
        `=password=${password}`,
        `=profile=${profile}`,
        '=disabled=no',
      );

      return;
    }

    await this.api.write(
      '/ppp/secret/add',
      `=name=${username}`,
      `=password=${password}`,
      `=profile=${profile}`,
      '=service=pppoe',
      '=disabled=no',
    );
  }

  async updatePassword(
    username: string,
    password: string,
  ): Promise<void> {
    const secretId =
      await this.findSecret(username);

    if (!secretId) {
      throw new Error(
        `PPPoE user '${username}' not found.`,
      );
    }

    await this.api!.write(
      '/ppp/secret/set',
      `=.id=${secretId}`,
      `=password=${password}`,
    );
  }

  async changeProfile(
    username: string,
    profile: string,
  ): Promise<void> {
    const secretId =
      await this.findSecret(username);

    if (!secretId) {
      throw new Error(
        `PPPoE user '${username}' not found.`,
      );
    }

    await this.api!.write(
      '/ppp/secret/set',
      `=.id=${secretId}`,
      `=profile=${profile}`,
    );
  }

  async enableUser(
    username: string,
  ): Promise<void> {
    const secretId =
      await this.findSecret(username);

    if (!secretId) {
      throw new Error(
        `PPPoE user '${username}' not found.`,
      );
    }

    await this.api!.write(
      '/ppp/secret/set',
      `=.id=${secretId}`,
      '=disabled=no',
    );
  }

  async disableUser(
    username: string,
  ): Promise<void> {
    const secretId =
      await this.findSecret(username);

    if (!secretId) {
      throw new Error(
        `PPPoE user '${username}' not found.`,
      );
    }

    await this.api!.write(
      '/ppp/secret/set',
      `=.id=${secretId}`,
      '=disabled=yes',
    );
  }

  async deleteUser(
    username: string,
  ): Promise<void> {
    const secretId =
      await this.findSecret(username);

    if (!secretId) {
      return;
    }

    await this.api!.write(
      '/ppp/secret/remove',
      `=.id=${secretId}`,
    );
  }

  async disconnectUser(
    username: string,
  ): Promise<boolean> {
    const sessionId =
      await this.findActiveSession(username);

    if (!sessionId) {
      return false;
    }

    await this.api!.write(
      '/ppp/active/remove',
      `=.id=${sessionId}`,
    );

    return true;
  }

  // ==========================
  // Monitoring APIs
  // ==========================

  async getActiveSessions(): Promise<any[]> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    return this.api.write('/ppp/active/print');
  }

  async getSystemResource(): Promise<any> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    const result = await this.api.write(
      '/system/resource/print',
    );

    return result[0];
  }

  async getInterfaces(): Promise<any[]> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    return this.api.write(
      '/interface/print',
    );
  }

  async getSimpleQueues(): Promise<any[]> {
    if (!this.api) {
      throw new Error('Not connected to MikroTik.');
    }

    return this.api.write(
      '/queue/simple/print',
    );
  }
}
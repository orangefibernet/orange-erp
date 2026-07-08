import { Injectable, Logger } from '@nestjs/common';
import { ProvisioningProvider } from './provisioning-provider.interface';

@Injectable()
export class MikrotikProvider
  implements ProvisioningProvider
{
  private readonly logger = new Logger(
    MikrotikProvider.name,
  );

  async activateConnection(
    connectionId: string,
  ): Promise<void> {
    this.logger.log(
      `Activate MikroTik PPPoE for ${connectionId}`,
    );
  }

  async suspendConnection(
    connectionId: string,
  ): Promise<void> {
    this.logger.log(
      `Suspend MikroTik PPPoE for ${connectionId}`,
    );
  }

  async resumeConnection(
    connectionId: string,
  ): Promise<void> {
    this.logger.log(
      `Resume MikroTik PPPoE for ${connectionId}`,
    );
  }

  async disconnectConnection(
    connectionId: string,
  ): Promise<void> {
    this.logger.log(
      `Disconnect MikroTik PPPoE for ${connectionId}`,
    );
  }

  async syncConnection(
    connectionId: string,
  ): Promise<void> {
    this.logger.log(
      `Sync MikroTik PPPoE for ${connectionId}`,
    );
  }
}
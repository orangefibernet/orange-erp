import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { ProvisioningEngineService } from '../provisioning-engine/provisioning-engine.service';

@Injectable()
export class ProvisioningTransactionService {
  private readonly logger = new Logger(
    ProvisioningTransactionService.name,
  );

  constructor(
    private readonly provisioningEngine: ProvisioningEngineService,
  ) {}

  async activate(connectionId: string) {
    this.logger.log(
      `Starting activation transaction for ${connectionId}`,
    );

    try {
      const result =
        await this.provisioningEngine.activate(
          connectionId,
        );

      this.logger.log(
        `Activation completed for ${connectionId}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Activation failed for ${connectionId}`,
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw error;
    }
  }

  async suspend(connectionId: string) {
    this.logger.log(
      `Starting suspend transaction for ${connectionId}`,
    );

    try {
      const result =
        await this.provisioningEngine.suspend(
          connectionId,
        );

      this.logger.log(
        `Suspend completed for ${connectionId}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Suspend failed for ${connectionId}`,
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw error;
    }
  }

  async resume(connectionId: string) {
    this.logger.log(
      `Starting resume transaction for ${connectionId}`,
    );

    try {
      const result =
        await this.provisioningEngine.resume(
          connectionId,
        );

      this.logger.log(
        `Resume completed for ${connectionId}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Resume failed for ${connectionId}`,
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw error;
    }
  }

  async disconnect(connectionId: string) {
    this.logger.log(
      `Starting disconnect transaction for ${connectionId}`,
    );

    try {
      const result =
        await this.provisioningEngine.disconnect(
          connectionId,
        );

      this.logger.log(
        `Disconnect completed for ${connectionId}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Disconnect failed for ${connectionId}`,
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw error;
    }
  }

  async changePackage(
    connectionId: string,
    subscriptionId: string,
  ) {
    this.logger.log(
      `Starting package change for ${connectionId}`,
    );

    try {
      const result =
        await this.provisioningEngine.changePackage(
          connectionId,
          subscriptionId,
        );

      this.logger.log(
        `Package changed successfully for ${connectionId}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Package change failed for ${connectionId}`,
        error instanceof Error
          ? error.stack
          : undefined,
      );

      throw error;
    }
  }
}
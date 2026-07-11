import { Injectable } from '@nestjs/common';
import { ProvisionOnuDto } from '../../dto/provision-onu.dto';
import { DeviceConnection } from '../../interfaces/device-connection.interface';
import { OltDriver } from '../../interfaces/olt-driver.interface';
import { TelnetTransport } from '../../transports/telnet.transport';
import { DiscoveredOnuParser } from './parsers/discovered-onu.parser';
import { ZteUnconfiguredOnu } from './models/unconfigured-onu.model';
import { CardParser } from './parsers/card.parser';
import { OnuStateParser } from './parsers/onu-state.parser';
import { OnuDetailParser } from './parsers/onu-detail.parser';
import { OpticalPowerParser } from './parsers/optical-power.parser';
import { CommandResult } from '../../models/command-result.model';
import { ZteCard } from './models/card.model';
import { ZteOnuState } from './models/onu-state.model';
import { ZteOnuDetail } from './models/onu-detail.model';
import { ZteOpticalPower } from './models/optical-power.model';
import { DeprovisionOnuDto } from '../../dto/deprovision-onu.dto';
import { ZteCommands } from './commands/commands';

@Injectable()
export class ZteDriver implements OltDriver {
  constructor(
    private readonly telnet: TelnetTransport,
  ) {}

  /**
   * Executes a CLI command on the OLT.
   */
  private async execute(
    connection: DeviceConnection,
    command: string,
  ): Promise<string> {
    const session = await this.telnet.connect(connection);

    try {
      return await session.execute(command);
    } finally {
      await session.disconnect();
    }
  }

  /**
   * Raw card output.
   */
  async showCards(
    connection: DeviceConnection,
  ): Promise<string> {
    return this.execute(
      connection,
      ZteCommands.SHOW_CARD,
    );
  }

  /**
   * Parsed cards.
   */
  async getCards(
    connection: DeviceConnection,
  ): Promise<ZteCard[]> {
    const output = await this.showCards(connection);

    return CardParser.parse(output);
  }

  /**
   * Raw ONU state.
   */
  async showOnuStates(
    connection: DeviceConnection,
  ): Promise<string> {
    return this.execute(
      connection,
      ZteCommands.SHOW_ONU_STATE,
    );
  }

  /**
   * Parsed ONU states.
   */
  async getOnuStates(
    connection: DeviceConnection,
  ): Promise<ZteOnuState[]> {
    const output =
      await this.showOnuStates(connection);

    return OnuStateParser.parse(output);
  }

  /**
   * Raw ONU detail.
   */
  async showOnuDetail(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<string> {
    return this.execute(
      connection,
      ZteCommands.buildOnuDetailCommand(
        interfaceName,
      ),
    );
  }

  /**
   * Parsed ONU detail.
   */
  async getOnuDetail(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOnuDetail[]> {
    const output =
      await this.showOnuDetail(
        connection,
        interfaceName,
      );

    return OnuDetailParser.parse(output);
  }

  /**
   * Raw optical power.
   */
  async showOpticalPower(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<string> {
    return this.execute(
      connection,
      ZteCommands.buildOpticalPowerCommand(
        interfaceName,
      ),
    );
  }

  /**
   * Parsed optical power.
   */
  async getOpticalPower(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOpticalPower> {
    const output =
      await this.showOpticalPower(
        connection,
        interfaceName,
      );

    return OpticalPowerParser.parse(
      interfaceName,
      output,
    );
  }

  /**
 * Provision a new ONU.
 */
async provisionOnu(
  connection: DeviceConnection,
  dto: ProvisionOnuDto,
): Promise<CommandResult[]> {
  const session =
    await this.telnet.connect(connection);

  const results: CommandResult[] = [];

  try {
    const commands =
      ZteCommands.buildProvisionOnuCommands(
        dto.ponPort,
        dto.onuId,
        dto.onuType,
        dto.serialNumber,
      );

    for (const command of commands) {
      const start = Date.now();

      try {
        const output =
          await session.execute(command);

        results.push({
          success: true,
          command,
          output,
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });
      } catch (error) {
        results.push({
          success: false,
          command,
          output: '',
          error:
            error instanceof Error
              ? error.message
              : 'Unknown error',
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });

        break;
      }
    }

    return results;
  } finally {
    await session.disconnect();
  }
}
/**
 * Deprovision ONU.
 */
async deprovisionOnu(
  connection: DeviceConnection,
  dto: DeprovisionOnuDto,
): Promise<CommandResult[]> {
  const session =
    await this.telnet.connect(connection);

  const results: CommandResult[] = [];

  try {
    const commands =
      ZteCommands.buildDeprovisionOnuCommands(
        dto.ponPort,
        dto.onuId,
      );

    for (const command of commands) {
      const start = Date.now();

      try {
        const output =
          await session.execute(command);

        results.push({
          success: true,
          command,
          output,
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });
      } catch (error) {
        results.push({
          success: false,
          command,
          output: '',
          error:
            error instanceof Error
              ? error.message
              : 'Unknown error',
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });

        break;
      }
    }

    return results;
  } finally {
    await session.disconnect();
  }
}

  /**
   * Test device connectivity.
   */
  async testConnection(
    connection: DeviceConnection,
  ): Promise<boolean> {
    await this.execute(
      connection,
      ZteCommands.SHOW_CARD,
    );

    return true;
  }
  /**
 * Raw unconfigured ONU list.
 */
async showUnconfiguredOnus(
  connection: DeviceConnection,
): Promise<string> {
  return this.execute(
    connection,
    ZteCommands.SHOW_UNCONFIGURED_ONUS,
  );
}

/**
 * Parsed unconfigured ONU list.
 */
async getUnconfiguredOnus(
  connection: DeviceConnection,
): Promise<ZteUnconfiguredOnu[]> {
  const output =
    await this.showUnconfiguredOnus(
      connection,
    );

  return DiscoveredOnuParser.parse(
    output,
  );
}
  /**
   * Reboot ONU.
   */
  async rebootOnu(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<CommandResult> {
    const command =
      ZteCommands.buildRebootOnuCommand(
        interfaceName,
      );

    return this.executeCommand(
      connection,
      command,
    );
  }

  /**
 * Factory reset ONU.
 */
async factoryResetOnu(
  connection: DeviceConnection,
  interfaceName: string,
): Promise<CommandResult> {
  const command =
    ZteCommands.buildFactoryResetCommand(
      interfaceName,
    );

  return this.executeCommand(
    connection,
    command,
  );
}

/**
 * Execute any CLI command.
 */
async executeCommand(
  connection: DeviceConnection,
  command: string,
): Promise<CommandResult> {
  const start = Date.now();

  try {
    const output = await this.execute(
      connection,
      command,
    );

    return {
      success: true,
      command,
      output,
      executionTimeMs: Date.now() - start,
      executedAt: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      command,
      output: '',
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error',
      executionTimeMs: Date.now() - start,
      executedAt: new Date(),
    };
  }
}
/**
 * Enable ONU.
 */
async enableOnu(
  connection: DeviceConnection,
  interfaceName: string,
): Promise<CommandResult> {
  const command =
    ZteCommands.buildEnableOnuCommand(
      interfaceName,
    );

  return this.executeCommand(
    connection,
    command,
  );
}

async renameOnu(
  connection: DeviceConnection,
  interfaceName: string,
  name: string,
): Promise<CommandResult[]> {
  const session =
    await this.telnet.connect(connection);

  const results: CommandResult[] = [];

  try {
    const commands =
      ZteCommands.buildOnuNameCommand(
        interfaceName,
        name,
      );

    for (const command of commands) {
      const start = Date.now();

      try {
        const output =
          await session.execute(command);

        results.push({
          success: true,
          command,
          output,
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });
      } catch (error) {
        results.push({
          success: false,
          command,
          output: '',
          error:
            error instanceof Error
              ? error.message
              : 'Unknown error',
          executionTimeMs:
            Date.now() - start,
          executedAt: new Date(),
        });

        break;
      }
    }

    return results;
  } finally {
    await session.disconnect();
  }
}

/**
 * Disable ONU.
 */
async disableOnu(
  connection: DeviceConnection,
  interfaceName: string,
): Promise<CommandResult> {
  const command =
    ZteCommands.buildDisableOnuCommand(
      interfaceName,
    );

  return this.executeCommand(
    connection,
    command,
  );
}
}
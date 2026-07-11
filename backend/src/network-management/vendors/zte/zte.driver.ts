import { Injectable } from '@nestjs/common';

import { DeviceConnection } from '../../interfaces/device-connection.interface';
import { TelnetTransport } from '../../transports/telnet.transport';

import { CardParser } from './parsers/card.parser';
import { OnuStateParser } from './parsers/onu-state.parser';
import { OnuDetailParser } from './parsers/onu-detail.parser';
import { OpticalPowerParser } from './parsers/optical-power.parser';

import { ZteCard } from './models/card.model';
import { ZteOnuState } from './models/onu-state.model';
import { ZteOnuDetail } from './models/onu-detail.model';
import { ZteOpticalPower } from './models/optical-power.model';

import { ZteCommands } from './commands/commands';

@Injectable()
export class ZteDriver {
  constructor(
    private readonly telnet: TelnetTransport,
  ) {}

  /**
   * Raw card output.
   */
  async showCards(
    connection: DeviceConnection,
  ): Promise<string> {
    const session = await this.telnet.connect(connection);

    try {
      return await session.execute(
        ZteCommands.SHOW_CARD,
      );
    } finally {
      await session.disconnect();
    }
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
    const session = await this.telnet.connect(connection);

    try {
      return await session.execute(
        ZteCommands.SHOW_ONU_STATE,
      );
    } finally {
      await session.disconnect();
    }
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
    const session = await this.telnet.connect(connection);

    try {
      return await session.execute(
        ZteCommands.buildOnuDetailCommand(
          interfaceName,
        ),
      );
    } finally {
      await session.disconnect();
    }
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
    const session = await this.telnet.connect(connection);

    try {
      return await session.execute(
        ZteCommands.buildOpticalPowerCommand(
          interfaceName,
        ),
      );
    } finally {
      await session.disconnect();
    }
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
   * Connection test.
   */
  async testConnection(
    connection: DeviceConnection,
  ): Promise<boolean> {
    const session = await this.telnet.connect(connection);

    try {
      await session.execute(
        ZteCommands.SHOW_CARD,
      );

      return true;
    } finally {
      await session.disconnect();
    }
  }
}
import { Injectable } from '@nestjs/common';

import { DeviceConnection } from '../../interfaces/device-connection.interface';
import { TelnetTransport } from '../../transports/telnet.transport';

import { ZteCommands } from './commands/commands';

@Injectable()
export class ZteDriver {
  constructor(
    private readonly telnet: TelnetTransport,
  ) {}

  async testConnection(
    connection: DeviceConnection,
  ) {
    await this.telnet.connect(connection);

    try {
      const output =
        await this.telnet.execute(
          ZteCommands.SHOW_CARD,
        );

      return {
        connected: true,
        output,
      };
    } finally {
      await this.telnet.disconnect();
    }
  }

  async showCards(
  connection: DeviceConnection,
) {
  await this.telnet.connect(connection);

  try {
    const output = await this.telnet.execute(
      ZteCommands.SHOW_CARD,
    );

    console.log('================ RAW ZTE OUTPUT ================');
    console.log(output);
    console.log('================================================');

    return output;
  } finally {
    await this.telnet.disconnect();
  }
}
}
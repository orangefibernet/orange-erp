import { Injectable } from '@nestjs/common';
import { Telnet } from 'telnet-client';

import { DeviceConnection } from '../interfaces/device-connection.interface';
import { NetworkSession } from '../interfaces/network-session.interface';
import { NetworkTransport } from '../interfaces/network-transport.interface';

class TelnetSession implements NetworkSession {
  constructor(
    private readonly connection: Telnet,
  ) {}

  async execute(
    command: string,
  ): Promise<string> {
    const output =
      await this.connection.send(command, {
        waitfor: /ZXAN[#>]\s*$/i,
        timeout: 30000,
        ors: '\r\n',
      });

    return output ?? '';
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection.end();
    } catch {
      // Ignore disconnect errors
    }
  }
}

@Injectable()
export class TelnetTransport
  implements NetworkTransport
{
  async connect(
    config: DeviceConnection,
  ): Promise<NetworkSession> {
    const connection = new Telnet();

    await connection.connect({
      host: config.host,
      port: config.port,

      username: config.username,
      password: config.password,

      loginPrompt:
        /(username|login|user)[: ]*$/im,

      passwordPrompt:
        /password[: ]*$/im,

      shellPrompt:
        /ZXAN[#>]\s*$/im,

      timeout:
        config.timeout ?? 10000,

      execTimeout: 30000,

      ors: '\r\n',
      irs: '\r\n',

      echoLines: 0,

      negotiationMandatory: false,

      pageSeparator:
        /--More--|---- More ----|More/i,

      debug: false,
    });

    /*
     * IMPORTANT
     *
     * After login the C300 prints
     * banners/password warnings before
     * reaching a stable prompt.
     *
     * Flush everything once so the first
     * real command starts with a clean
     * prompt.
     */
    await connection.send('', {
      waitfor: /ZXAN[#>]\s*$/i,
      timeout: 10000,
      ors: '\r\n',
    });

    return new TelnetSession(connection);
  }
}
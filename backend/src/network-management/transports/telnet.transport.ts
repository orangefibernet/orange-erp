import { Injectable } from '@nestjs/common';
import { Telnet } from 'telnet-client';

import { DeviceConnection } from '../interfaces/device-connection.interface';
import { NetworkTransport } from '../interfaces/network-transport.interface';

@Injectable()
export class TelnetTransport implements NetworkTransport {
  private readonly connection = new Telnet();

  private connected = false;

  async connect(
    config?: DeviceConnection,
  ): Promise<void> {
    if (!config) {
      throw new Error('Connection configuration missing.');
    }

    await this.connection.connect({
      host: config.host,
      port: config.port,

      username: config.username,
      password: config.password,

      loginPrompt: /(username|login|user)[: ]*$/i,
      passwordPrompt: /password[: ]*$/i,

      shellPrompt: /ZXAN[#>]\s*$/i,

      timeout: config.timeout ?? 10000,
      execTimeout: 30000,

      ors: '\r\n',
      irs: '\r\n',

      echoLines: 0,
      negotiationMandatory: false,
      pageSeparator: /--More--|---- More ----/i,

      debug: false,
    });

    this.connected = true;
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      try {
        await this.connection.end();
      } finally {
        this.connected = false;
      }
    }
  }

  async execute(
    command: string,
  ): Promise<string> {
    if (!this.connected) {
      throw new Error('Telnet session not connected.');
    }

    const output = await this.connection.send(command, {
      waitfor: /ZXAN[#>]\s*$/i,
      timeout: 30000,
      ors: '\r\n',
    });

    return output ?? '';
  }

  isConnected(): boolean {
    return this.connected;
  }
}
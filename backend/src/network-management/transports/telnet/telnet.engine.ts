import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'net';

@Injectable()
export class TelnetEngine {
  private readonly logger = new Logger(TelnetEngine.name);

  private socket: Socket | null = null;

  private connected = false;

  isConnected(): boolean {
    return this.connected;
  }

  async connect(
    host: string,
    port: number,
    timeout = 10000,
  ): Promise<void> {
    if (this.connected) {
      return;
    }

    this.socket = new Socket();

    await new Promise<void>((resolve, reject) => {
      this.socket!.setTimeout(timeout);

      this.socket!.once('connect', () => {
        this.connected = true;

        this.logger.log(
          `Connected to ${host}:${port}`,
        );

        resolve();
      });

      this.socket!.once(
        'error',
        (error) => {
          reject(error);
        },
      );

      this.socket!.once(
        'timeout',
        () => {
          reject(
            new Error(
              'Connection timeout.',
            ),
          );
        },
      );

      this.socket!.connect(
        port,
        host,
      );
    });
  }

  async disconnect(): Promise<void> {
    if (!this.socket) {
      return;
    }

    this.socket.destroy();

    this.socket = null;

    this.connected = false;
  }

  getSocket(): Socket {
    if (!this.socket) {
      throw new Error(
        'Socket not connected.',
      );
    }

    return this.socket;
  }
}
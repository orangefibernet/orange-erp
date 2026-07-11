import { Injectable } from '@nestjs/common';
import { Socket } from 'net';

@Injectable()
export class TelnetWriter {
  async write(
    socket: Socket,
    command: string,
  ): Promise<void> {
    socket.write(
      `${command}\r\n`,
    );
  }
}
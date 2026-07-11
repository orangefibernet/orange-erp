import { Injectable } from '@nestjs/common';
import { Socket } from 'net';

@Injectable()
export class PagerHandler {
  private readonly patterns = [
    /--More--/i,
    /---- More ----/i,
    /Press any key/i,
  ];

  hasPager(buffer: string): boolean {
    return this.patterns.some((p) =>
      p.test(buffer),
    );
  }

  continue(socket: Socket): void {
    socket.write(' ');
  }
}
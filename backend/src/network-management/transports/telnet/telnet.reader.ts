import { Injectable } from '@nestjs/common';
import { Socket } from 'net';

@Injectable()
export class TelnetReader {
  async read(
    socket: Socket,
    timeout = 10000,
  ): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        let buffer = '';

        const timer = setTimeout(() => {
          cleanup();

          reject(
            new Error(
              'Read timeout.',
            ),
          );
        }, timeout);

        const cleanup = () => {
          clearTimeout(timer);

          socket.removeListener(
            'data',
            onData,
          );

          socket.removeListener(
            'error',
            onError,
          );
        };

        const onData = (
          data: Buffer,
        ) => {
          buffer += data.toString();

          if (
            buffer.includes(
              'ZXAN#',
            )
          ) {
            cleanup();

            resolve(buffer);
          }
        };

        const onError = (
          error: Error,
        ) => {
          cleanup();

          reject(error);
        };

        socket.on(
          'data',
          onData,
        );

        socket.on(
          'error',
          onError,
        );
      },
    );
  }
}
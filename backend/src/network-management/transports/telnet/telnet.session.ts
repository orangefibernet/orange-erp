import { Injectable } from '@nestjs/common';

import { TelnetEngine } from './telnet.engine';
import { TelnetReader } from './telnet.reader';
import { TelnetWriter } from './telnet.writer';
import { PromptDetector } from './prompt.detector';
import { PagerHandler } from './pager.handler';

@Injectable()
export class TelnetSession {
  constructor(
    private readonly engine: TelnetEngine,
    private readonly reader: TelnetReader,
    private readonly writer: TelnetWriter,
    private readonly prompt: PromptDetector,
    private readonly pager: PagerHandler,
  ) {}

  async execute(
    command: string,
  ): Promise<string> {
    const socket =
      this.engine.getSocket();

    await this.writer.write(
      socket,
      command,
    );

    let output = '';

    while (true) {
      const chunk =
        await this.reader.read(socket);

      output += chunk;

      if (
        this.pager.hasPager(output)
      ) {
        this.pager.continue(socket);

        continue;
      }

      if (
        this.prompt.isPrompt(output)
      ) {
        break;
      }
    }

    return output;
  }
}
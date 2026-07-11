import { Injectable, Logger } from '@nestjs/common';

import { CommandLog } from '../models/command-log.model';

@Injectable()
export class CommandLoggerService {
  private readonly logger =
    new Logger(CommandLoggerService.name);

  log(log: CommandLog): void {
    this.logger.log(
      JSON.stringify(log),
    );
  }
}
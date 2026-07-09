import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { NetworkSessionService } from './network-session.service';

@Module({
  imports: [DatabaseModule],
  providers: [NetworkSessionService],
  exports: [NetworkSessionService],
})
export class NetworkSessionModule {}
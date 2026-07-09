import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { NetworkSessionModule } from '../network-session/network-session.module';

import { MikrotikAdapter } from './adapters/mikrotik.adapter';
import { NetworkService } from './network.service';

@Module({
  imports: [
    DatabaseModule,
    NetworkSessionModule,
  ],
  providers: [
    NetworkService,
    MikrotikAdapter,
  ],
  exports: [
    NetworkService,
  ],
})
export class NetworkModule {}
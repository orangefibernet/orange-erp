import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { OltModule } from '../olt/olt.module';

import { NetworkManagementController } from './network-management.controller';
import { NetworkManagementService } from './network-management.service';

import { TelnetTransport } from './transports/telnet.transport';
import { ZteDriver } from './vendors/zte/zte.driver';

@Module({
  imports: [
    DatabaseModule,
    OltModule,
  ],
  controllers: [
    NetworkManagementController,
  ],
  providers: [
    NetworkManagementService,
    TelnetTransport,
    ZteDriver,
  ],
  exports: [
    NetworkManagementService,
  ],
})
export class NetworkManagementModule {}
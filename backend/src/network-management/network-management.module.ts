import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { OltModule } from '../olt/olt.module';
import { PonPortModule } from '../pon-port/pon-port.module';
import { OnuModule } from '../onu/onu.module';
import { CommandLoggerService } from './logger/command-logger.service';
import { NetworkManagementController } from './network-management.controller';
import { NetworkManagementService } from './network-management.service';
import { OnuLifecycleService } from './services/onu-lifecycle.service';
import { TelnetTransport } from './transports/telnet.transport';
import { OltDriverFactory } from './olt-driver.factory';

import { CardSyncService } from './services/card-sync.service';
import { PonPortSyncService } from './services/pon-port-sync.service';

import { OnuSyncService } from './sync/onu-sync.service';

import { ZteDriver } from './vendors/zte/zte.driver';
import { ZteOnuService } from './vendors/zte/services/onu.service';

@Module({
  imports: [
    DatabaseModule,
    OltModule,
    PonPortModule,
    OnuModule,
  ],

  controllers: [
    NetworkManagementController,
  ],

  providers: [
    NetworkManagementService,
    OnuLifecycleService,

    TelnetTransport,
    CommandLoggerService, 
    OltDriverFactory,

    ZteDriver,

    ZteOnuService,

    CardSyncService,
    PonPortSyncService,
    OnuSyncService,
  ],

  exports: [
    NetworkManagementService,

    OltDriverFactory,
    CommandLoggerService,
    CardSyncService,
    PonPortSyncService,
    OnuSyncService,
  ],
})
export class NetworkManagementModule {}
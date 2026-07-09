import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ProvisioningLogModule } from '../provisioning-log/provisioning-log.module';
import { ProvisioningQueueModule } from '../provisioning-queue/provisioning-queue.module';
import { RadiusModule } from '../radius/radius.module';

import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  imports: [
    DatabaseModule,
    RadiusModule,
    ProvisioningLogModule,
    ProvisioningQueueModule,
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
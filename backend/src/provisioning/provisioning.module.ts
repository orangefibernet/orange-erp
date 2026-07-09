import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { IpAllocationModule } from '../ip-allocation/ip-allocation.module';
import { NetworkModule } from '../network/network.module';
import { NetworkSessionModule } from '../network-session/network-session.module';
import { ProvisioningCoreModule } from '../provisioning-core/provisioning-core.module';
import { ProvisioningLogModule } from '../provisioning-log/provisioning-log.module';
import { ProvisioningQueueModule } from '../provisioning-queue/provisioning-queue.module';
import { RadiusModule } from '../radius/radius.module';

import { ProvisioningController } from './provisioning.controller';
import { ProvisioningEngineService } from './provisioning-engine/provisioning-engine.service';
import { ProvisioningService } from './provisioning.service';


@Module({
  imports: [
    DatabaseModule,
    RadiusModule,
    ProvisioningLogModule,
    NetworkModule,
    NetworkSessionModule,
    IpAllocationModule,
    ProvisioningCoreModule,
    ProvisioningQueueModule,
    
  ],
  controllers: [ProvisioningController],
  providers: [
    ProvisioningService,
    ProvisioningEngineService,
  ],
  exports: [
    ProvisioningService,
    ProvisioningEngineService,
  ],
})
export class ProvisioningModule {}
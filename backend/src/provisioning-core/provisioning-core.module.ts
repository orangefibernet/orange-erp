import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { IpAllocationModule } from '../ip-allocation/ip-allocation.module';
import { NetworkModule } from '../network/network.module';
import { NetworkSessionModule } from '../network-session/network-session.module';
import { ProvisioningLogModule } from '../provisioning-log/provisioning-log.module';
import { RadiusModule } from '../radius/radius.module';
import { ProvisioningContextService } from '../provisioning/provisioning-engine/provisioning-context.service';
import { ProvisioningEngineService } from '../provisioning/provisioning-engine/provisioning-engine.service';
import { ProvisioningTransactionService } from '../provisioning/provisioning-transaction/provisioning-transaction.service';

@Module({
  imports: [
    DatabaseModule,
    RadiusModule,
    ProvisioningLogModule,
    NetworkModule,
    NetworkSessionModule,
    IpAllocationModule,
  ],
  providers: [
   ProvisioningContextService,
  ProvisioningEngineService,
  ProvisioningTransactionService,
  ],
  exports: [
    ProvisioningContextService,
  ProvisioningEngineService,
  ProvisioningTransactionService,
  ],
})
export class ProvisioningCoreModule {}
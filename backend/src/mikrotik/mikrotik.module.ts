import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ProvisioningLogModule } from '../provisioning-log/provisioning-log.module';

import { MikrotikController } from './mikrotik.controller';
import { MikrotikService } from './mikrotik.service';

@Module({
  imports: [
    DatabaseModule,
    ProvisioningLogModule,
  ],
  controllers: [MikrotikController],
  providers: [MikrotikService],
  exports: [MikrotikService],
})
export class MikrotikModule {}
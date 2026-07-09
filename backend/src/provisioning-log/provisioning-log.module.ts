import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { ProvisioningLogService } from './provisioning-log.service';

@Module({
  imports: [DatabaseModule],
  providers: [ProvisioningLogService],
  exports: [ProvisioningLogService],
})
export class ProvisioningLogModule {}
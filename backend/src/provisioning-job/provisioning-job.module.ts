import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { ProvisioningJobController } from './provisioning-job.controller';
import { ProvisioningJobService } from './provisioning-job.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvisioningJobController],
  providers: [ProvisioningJobService],
  exports: [ProvisioningJobService],
})
export class ProvisioningJobModule {}
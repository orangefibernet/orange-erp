import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { IpAllocationService } from './ip-allocation.service';

@Module({
  imports: [DatabaseModule],
  providers: [IpAllocationService],
  exports: [IpAllocationService],
})
export class IpAllocationModule {}
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { IpPoolController } from './ip-pool.controller';
import { IpPoolService } from './ip-pool.service';

@Module({
  imports: [DatabaseModule],
  controllers: [IpPoolController],
  providers: [IpPoolService],
})
export class IpPoolModule {}
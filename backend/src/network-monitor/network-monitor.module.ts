import { Module } from '@nestjs/common';

import { NetworkModule } from '../network/network.module';

import { NetworkMonitorController } from './network-monitor.controller';
import { NetworkMonitorService } from './network-monitor.service';

@Module({
  imports: [NetworkModule],
  controllers: [NetworkMonitorController],
  providers: [NetworkMonitorService],
  exports: [NetworkMonitorService],
})
export class NetworkMonitorModule {}
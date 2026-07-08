import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConnectionController],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
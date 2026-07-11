import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { PonPortController } from './pon-port.controller';
import { PonPortService } from './pon-port.service';

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    PonPortController,
  ],

  providers: [
    PonPortService,
  ],

  exports: [
    PonPortService,
  ],
})
export class PonPortModule {}
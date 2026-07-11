import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { OnuController } from './onu.controller';
import { OnuService } from './onu.service';

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    OnuController,
  ],

  providers: [
    OnuService,
  ],

  exports: [
    OnuService,
  ],
})
export class OnuModule {}
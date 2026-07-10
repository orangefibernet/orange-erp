import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { OltController } from './olt.controller';
import { OltService } from './olt.service';
import { ZteAdapter } from './adapters/zte.adapter';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    OltController,
  ],
  providers: [
    OltService,
    ZteAdapter,
  ],
  exports: [
    OltService,
    ZteAdapter,
  ],
})
export class OltModule {}
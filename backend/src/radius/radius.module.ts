import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { RadiusController } from './radius.controller';
import { RadiusService } from './radius.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RadiusController],
  providers: [RadiusService],
  exports: [RadiusService],   // <-- Required
})
export class RadiusModule {}
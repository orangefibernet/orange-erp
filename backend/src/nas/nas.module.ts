import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { NasController } from './nas.controller';
import { NasService } from './nas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NasController],
  providers: [NasService],
  exports: [NasService],
})
export class NasModule {}
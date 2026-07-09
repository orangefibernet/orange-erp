import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { SelfcareController } from './selfcare.controller';
import { SelfcareService } from './selfcare.service';
import { NetworkSessionModule } from '../network-session/network-session.module';

@Module({
  imports: [
    DatabaseModule,
    NetworkSessionModule,
  ],
  controllers: [
    SelfcareController,
  ],
  providers: [
    SelfcareService,
  ],
})
export class SelfcareModule {}
import { Module } from '@nestjs/common';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

import { DatabaseModule } from '../database/database.module';
import { CounterModule } from '../counter/counter.module';

@Module({
  imports: [
    DatabaseModule,
    CounterModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
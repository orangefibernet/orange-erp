import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CounterModule } from '../counter/counter.module';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    DatabaseModule,
    CounterModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
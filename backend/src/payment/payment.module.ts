import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CounterModule } from '../counter/counter.module';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { NotificationModule } from '../notification/notification.module';
import { ProvisioningQueueModule } from '../provisioning-queue/provisioning-queue.module';

@Module({
  imports: [
    DatabaseModule,
    CounterModule,
    NotificationModule,
    ProvisioningQueueModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
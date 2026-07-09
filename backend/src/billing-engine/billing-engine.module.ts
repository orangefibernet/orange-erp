import { Module } from '@nestjs/common';
import { BillingEngineService } from './billing-engine.service';

@Module({
  providers: [BillingEngineService]
})
export class BillingEngineModule {}

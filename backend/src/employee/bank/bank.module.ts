import { Module } from '@nestjs/common';

import { BankController } from './bank.controller';
import { BankService } from './bank.service';

import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
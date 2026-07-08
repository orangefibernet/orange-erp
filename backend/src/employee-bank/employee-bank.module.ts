import { Module } from '@nestjs/common';

import { EmployeeBankController } from './employee-bank.controller';
import { EmployeeBankService } from './employee-bank.service';

import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeBankController],
  providers: [EmployeeBankService],
  exports: [EmployeeBankService],
})
export class EmployeeBankModule {}
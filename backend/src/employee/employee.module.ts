import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CounterModule } from '../counter/counter.module';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

import { BankModule } from './bank/bank.module';
import { EmergencyModule } from './emergency/emergency.module';

@Module({
  imports: [
    DatabaseModule,
    CounterModule,
    BankModule,
    EmergencyModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
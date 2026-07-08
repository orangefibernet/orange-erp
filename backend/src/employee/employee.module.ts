import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { BankModule } from './bank/bank.module';
import { EmergencyModule } from './emergency/emergency.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [BankModule, EmergencyModule]
})
export class EmployeeModule {}

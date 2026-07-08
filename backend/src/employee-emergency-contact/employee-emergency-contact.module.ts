import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { EmployeeEmergencyContactController } from './employee-emergency-contact.controller';
import { EmployeeEmergencyContactService } from './employee-emergency-contact.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeEmergencyContactController],
  providers: [EmployeeEmergencyContactService],
  exports: [EmployeeEmergencyContactService],
})
export class EmployeeEmergencyContactModule {}
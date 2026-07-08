import { Module } from '@nestjs/common';

import { StorageModule } from '../storage/storage.module';

import { EmployeeDocumentsController } from './employee-documents.controller';
import { EmployeeDocumentsService } from './employee-documents.service';

@Module({
  imports: [StorageModule],
  controllers: [EmployeeDocumentsController],
  providers: [EmployeeDocumentsService],
})
export class EmployeeDocumentsModule {}
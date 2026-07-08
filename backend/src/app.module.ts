import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import {
  appConfig,
  authConfig,
  databaseConfig,
  swaggerConfig,
} from './config';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeeBankModule } from './employee-bank/employee-bank.module';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { EmployeeModule } from './employee/employee.module';
import { AuditModule } from './audit/audit.module';
import { StorageModule } from './storage/storage.module';
import { CounterModule } from './counter/counter.module';
import { EmployeeDocumentsModule } from './employee-documents/employee-documents.module';
import { EmployeeEmergencyContactModule } from './employee-emergency-contact/employee-emergency-contact.module';
import { EmployeeDocumentModule } from './employee-document/employee-document.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ShiftModule } from './shift/shift.module';
import { HolidayModule } from './holiday/holiday.module';
import { CustomerModule } from './customer/customer.module';
import { PackageModule } from './package/package.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConnectionModule } from './connection/connection.module';
import { BillingModule } from './billing/billing.module';
import { OltModule } from './olt/olt.module';
import { OnuModule } from './onu/onu.module';
import { PonPortModule } from './pon-port/pon-port.module';
import { ProvisioningModule } from './provisioning/provisioning.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { BillingSchedulerModule } from './billing-scheduler/billing-scheduler.module';
import { PdfModule } from './pdf/pdf.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [
        appConfig,
        authConfig,
        databaseConfig,
        swaggerConfig,
      ],
    }),

    ScheduleModule.forRoot(),

    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
    EmployeeBankModule,
    CompanyModule,
    BranchModule,
    DepartmentModule,
    DesignationModule,
    EmployeeModule,
    AuditModule,
    StorageModule,
    CounterModule,
    EmployeeDocumentsModule,
    EmployeeEmergencyContactModule,
    EmployeeDocumentModule,
    AttendanceModule,
    ShiftModule,
    HolidayModule,
    CustomerModule,
    PackageModule,
    SubscriptionModule,
    ConnectionModule,
    BillingModule,
    OltModule,
    OnuModule,
    PonPortModule,
    ProvisioningModule,
    DashboardModule,
    InvoiceModule,
    PaymentModule,
    BillingSchedulerModule,
    PdfModule,
    
  ],
})
export class AppModule {}
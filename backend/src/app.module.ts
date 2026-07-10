import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';

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
import { SchedulerModule } from './scheduler/scheduler.module';
import { NasModule } from './nas/nas.module';
import { IpPoolModule } from './ip-pool/ip-pool.module';
import { RadiusServerModule } from './radius-server/radius-server.module';
import { IpAddressModule } from './ip-address/ip-address.module';
import { IpAllocationModule } from './ip-allocation/ip-allocation.module';
import { IpGeneratorModule } from './ip-generator/ip-generator.module';
import { ProvisioningLogModule } from './provisioning-log/provisioning-log.module';
import { RadiusProvisionModule } from './radius-provision/radius-provision.module';
import { RadiusModule } from './radius/radius.module';
import { MikrotikModule } from './mikrotik/mikrotik.module';
import { NetworkModule } from './network/network.module';
import { NetworkSessionModule } from './network-session/network-session.module';
import { ProvisioningQueueModule } from './provisioning-queue/provisioning-queue.module';
import { NetworkMonitorModule } from './network-monitor/network-monitor.module';
import { ProvisioningCoreModule } from './provisioning-core/provisioning-core.module';
import { ProvisioningJobModule } from './provisioning-job/provisioning-job.module';
import { BillingEngineModule } from './billing-engine/billing-engine.module';
import { SelfcareModule } from './selfcare/selfcare.module';
import { NotificationModule } from './notification/notification.module';
import { NetworkManagementModule } from './network-management/network-management.module';

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

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),

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
    ProvisioningModule,
    BillingModule,
    OltModule,
    OnuModule,
    PonPortModule,
    DashboardModule,
    InvoiceModule,
    PaymentModule,
    BillingSchedulerModule,
    PdfModule,
    SchedulerModule,
    NasModule,
    IpPoolModule,
    RadiusServerModule,
    IpAddressModule,
    IpAllocationModule,
    IpGeneratorModule,
    ProvisioningLogModule,
    RadiusProvisionModule,
    RadiusModule,
    MikrotikModule,
    NetworkModule,
    NetworkSessionModule,
    ProvisioningQueueModule,
    NetworkMonitorModule,
    ProvisioningCoreModule,
    ProvisioningJobModule,
    BillingEngineModule,
    SelfcareModule,
    NotificationModule,
    NetworkManagementModule,
  ],
})
export class AppModule {}
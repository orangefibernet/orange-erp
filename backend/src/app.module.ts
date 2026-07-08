import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,

    CompanyModule,
    BranchModule,
    DepartmentModule,
    DesignationModule,
    EmployeeModule,
  ],
})
export class AppModule {}
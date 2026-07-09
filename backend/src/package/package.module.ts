import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { RadiusModule } from '../radius/radius.module';

import { PackageController } from './package.controller';
import { PackageProvisioningService } from './package-provisioning/package-provisioning.service';
import { PackageService } from './package.service';

@Module({
  imports: [
    DatabaseModule,
    RadiusModule,
  ],
  controllers: [
    PackageController,
  ],
  providers: [
    PackageService,
    PackageProvisioningService,
  ],
  exports: [
    PackageService,
    PackageProvisioningService,
  ],
})
export class PackageModule {}
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { RadiusProvisionController } from './radius-provision.controller';
import { RadiusProvisionService } from './radius-provision.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    RadiusProvisionController,
  ],
  providers: [
    RadiusProvisionService,
  ],
  exports: [
    RadiusProvisionService,
  ],
})
export class RadiusProvisionModule {}
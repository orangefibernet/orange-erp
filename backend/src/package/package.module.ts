import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { PackageController } from './package.controller';
import { PackageService } from './package.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
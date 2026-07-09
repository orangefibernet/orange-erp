import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { IpGeneratorController } from './ip-generator.controller';
import { IpGeneratorService } from './ip-generator.service';

@Module({
  imports: [DatabaseModule],
  controllers: [IpGeneratorController],
  providers: [IpGeneratorService],
  exports: [IpGeneratorService],
})
export class IpGeneratorModule {}
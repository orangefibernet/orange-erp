import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CounterService } from './counter.service';

@Module({
  imports: [DatabaseModule],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
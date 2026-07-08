import { Module } from '@nestjs/common';
import { PonPortController } from './pon-port.controller';
import { PonPortService } from './pon-port.service';

@Module({
  controllers: [PonPortController],
  providers: [PonPortService]
})
export class PonPortModule {}

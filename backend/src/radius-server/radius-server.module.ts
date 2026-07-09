import { Module } from '@nestjs/common';
import { RadiusServerController } from './radius-server.controller';
import { RadiusServerService } from './radius-server.service';

@Module({
  controllers: [RadiusServerController],
  providers: [RadiusServerService]
})
export class RadiusServerModule {}

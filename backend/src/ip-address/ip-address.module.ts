import { Module } from '@nestjs/common';
import { IpAddressController } from './ip-address.controller';
import { IpAddressService } from './ip-address.service';

@Module({
  controllers: [IpAddressController],
  providers: [IpAddressService]
})
export class IpAddressModule {}

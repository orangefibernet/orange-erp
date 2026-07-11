import { Injectable } from '@nestjs/common';

import { OltVendor } from '@prisma/client';

import { OltDriver } from './interfaces/olt-driver.interface';

import { ZteDriver } from './vendors/zte/zte.driver';

@Injectable()
export class OltDriverFactory {
  constructor(
    private readonly zteDriver: ZteDriver,
  ) {}

  getDriver(
    vendor: OltVendor,
  ): OltDriver {
    switch (vendor) {
      case OltVendor.ZTE:
        return this.zteDriver;

      default:
        throw new Error(
          `Unsupported OLT vendor: ${vendor}`,
        );
    }
  }
}
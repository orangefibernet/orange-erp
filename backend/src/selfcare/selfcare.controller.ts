import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { SelfcareService } from './selfcare.service';

@Controller('selfcare')
export class SelfcareController {
  constructor(
    private readonly selfcareService: SelfcareService,
  ) {}

  @Get('dashboard/:customerId')
  dashboard(
    @Param('customerId') customerId: string,
  ) {
    return this.selfcareService.dashboard(
      customerId,
    );
  }

  @Get('profile/:customerId')
  profile(
    @Param('customerId') customerId: string,
  ) {
    return this.selfcareService.profile(
      customerId,
    );
  }
  @Get('invoices/:customerId')
invoices(
  @Param('customerId') customerId: string,
) {
  return this.selfcareService.invoices(customerId);
}

@Get('payments/:customerId')
payments(
  @Param('customerId') customerId: string,
) {
  return this.selfcareService.payments(customerId);
}

@Get('outstanding/:customerId')
outstanding(
  @Param('customerId') customerId: string,
) {
  return this.selfcareService.outstanding(customerId);
}
@Get('session/:customerId')
session(
  @Param('customerId') customerId: string,
) {
  return this.selfcareService.session(
    customerId,
  );
}
}
import { Module } from '@nestjs/common';

import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [BillingModule],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
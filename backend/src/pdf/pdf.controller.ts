import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
  ) {}

  @Get('billing/:id')
  async billing(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const pdf =
      await this.pdfService.generateBillingInvoice(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'inline; filename=invoice.pdf',
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }
}
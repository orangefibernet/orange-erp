import { Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
  ) {}

  @Post('generate')
  async generateBills() {
    const generated =
      await this.billingService.generateMonthlyBills();

    return {
      success: true,
      generated,
      message: `${generated} billing record(s) generated.`,
    };
  }

  @Get()
  async findAll() {
    return this.billingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.billingService.findOne(id);
  }
}
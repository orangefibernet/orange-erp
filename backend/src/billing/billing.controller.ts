import { Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Body } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
  ) {}
@Post('generate-one')
async generateOne(
  @Body() dto: CreateBillingDto,
) {
  return this.billingService.generateOne(dto);
}
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
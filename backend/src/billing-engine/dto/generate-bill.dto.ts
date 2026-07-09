export class GenerateBillDto {
  subscriptionId: string;

  billDate?: Date;

  generateInvoice?: boolean;

  applyDiscounts?: boolean;

  applyTaxes?: boolean;
}
export interface BillingResult {
  subscriptionId: string;

  invoiceId?: string;

  amount: number;

  taxAmount: number;

  discountAmount: number;

  totalAmount: number;

  success: boolean;

  message: string;
}
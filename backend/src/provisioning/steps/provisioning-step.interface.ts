export interface ProvisioningContext {
  customerId: string;
  subscriptionId: string;

  connection?: any;
  ipAddress?: any;
  radiusGroup?: string;

  success: boolean;
  errors: string[];
}

export interface ProvisioningStep {
  execute(
    context: ProvisioningContext,
  ): Promise<void>;
}
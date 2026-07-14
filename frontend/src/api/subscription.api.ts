import api from "./axios";

export interface CreateSubscriptionRequest {
  customerId: string;
  packageId: string;

  monthlyPrice: number;

  billingCycle: string;
  billingDay: number;

  startDate: string;

  autoRenew: boolean;

  status: string;

  installationCharge?: number;
  securityDeposit?: number;
  discountAmount?: number;

  remarks?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function createSubscription(
  payload: CreateSubscriptionRequest,
) {
  const response =
    await api.post<ApiResponse<any>>(
      "/subscriptions",
      payload,
    );

  return response.data.data;
}
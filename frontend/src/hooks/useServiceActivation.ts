import { useCreateSubscription } from "./useCreateSubscription";
import { useCreateConnection } from "./useCreateConnection";

import type { Package } from "../api/package.api";

export interface ActivateServiceRequest {
  customerId: string;

  packageId: string;
  selectedPackage: Package;

  billingDay: number;

  connectionNumber: string;

  pppoeUsername: string;
  pppoePassword: string;

  serviceType: string;
}

export function useServiceActivation() {
  const subscriptionMutation =
    useCreateSubscription();

  const connectionMutation =
    useCreateConnection();

  async function activate(
    request: ActivateServiceRequest,
  ) {
    const subscription =
      await subscriptionMutation.mutateAsync({
        customerId: request.customerId,

        packageId: request.packageId,

        monthlyPrice:
          Number(
            request.selectedPackage.monthlyPrice,
          ),

        billingCycle:
          request.selectedPackage.billingCycle,

        billingDay: request.billingDay,

        startDate:
          new Date().toISOString(),

        autoRenew: true,

        status: "ACTIVE",
      });

    const connection =
      await connectionMutation.mutateAsync({
        customerId: request.customerId,

        subscriptionId: subscription.id,

        connectionNumber:
          request.connectionNumber,

        pppoeUsername:
          request.pppoeUsername,

        pppoePassword:
          request.pppoePassword,

        serviceType:
          request.serviceType,

        status: "ACTIVE",
      });

    return {
      subscription,
      connection,
    };
  }

  return {
    activate,

    isPending:
      subscriptionMutation.isPending ||
      connectionMutation.isPending,
  };
}
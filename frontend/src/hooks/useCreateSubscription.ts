import { useMutation } from "@tanstack/react-query";

import {
  createSubscription,
  type CreateSubscriptionRequest,
} from "../api";

export function useCreateSubscription() {
  return useMutation({
    mutationFn: (
      payload: CreateSubscriptionRequest,
    ) => createSubscription(payload),
  });
}
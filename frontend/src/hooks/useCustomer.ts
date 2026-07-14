import { useQuery } from "@tanstack/react-query";

import api from "../api/axios";
import type { Customer } from "../api/customer.api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function getCustomer(
  id: string,
): Promise<Customer> {
  const response =
    await api.get<ApiResponse<Customer>>(
      `/customers/${id}`,
    );

  return response.data.data;
}

export function useCustomer(
  id: string,
) {
  return useQuery({
    queryKey: [
      "customer",
      id,
    ],

    queryFn: () =>
      getCustomer(id),

    enabled: !!id,

    staleTime: 60_000,
  });
}
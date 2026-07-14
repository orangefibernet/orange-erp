import { useQuery } from "@tanstack/react-query";

import {
  getCustomers,
  type CustomerQuery,
} from "../api";

export function useCustomers(
  query: CustomerQuery,
) {
  return useQuery({
    queryKey: [
      "customers",
      query,
    ],

    queryFn: () =>
      getCustomers(query),

    placeholderData: (
      previousData,
    ) => previousData,

    staleTime: 60_000,
  });
}
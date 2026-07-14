import { useQuery } from "@tanstack/react-query";

import { getOnus } from "../api";

export function useOnus(id: string) {
  return useQuery({
    queryKey: ["onus", id],
    queryFn: () => getOnus(id),
    enabled: !!id,
    staleTime: 60000,
  });
}
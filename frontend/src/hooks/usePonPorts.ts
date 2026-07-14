import { useQuery } from "@tanstack/react-query";

import { getPonPorts } from "../api";

export function usePonPorts(id: string) {
  return useQuery({
    queryKey: ["pon-ports", id],
    queryFn: () => getPonPorts(id),
    enabled: !!id,
    staleTime: 60000,
  });
}
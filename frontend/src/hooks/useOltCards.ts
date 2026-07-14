import { useQuery } from "@tanstack/react-query";

import { getOltCards } from "../api";

export function useOltCards(id: string) {
  return useQuery({
    queryKey: ["olt-cards", id],
    queryFn: () => getOltCards(id),
    enabled: !!id,
    staleTime: 60000,
  });
}
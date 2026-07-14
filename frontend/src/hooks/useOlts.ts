import { useQuery } from "@tanstack/react-query";

import { getOlts } from "../api";

export function useOlts() {
  return useQuery({
    queryKey: ["olts"],
    queryFn: getOlts,
    staleTime: 60000,
  });
}
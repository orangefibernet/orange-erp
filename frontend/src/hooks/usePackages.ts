import { useQuery } from "@tanstack/react-query";

import { getPackages } from "../api";

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],

    queryFn: getPackages,

    staleTime: 60_000,
  });
}
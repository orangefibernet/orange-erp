import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary } from "../api";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    staleTime: 60000,
    retry: 1,
  });
}
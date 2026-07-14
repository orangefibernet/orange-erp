import { useMutation, useQueryClient } from "@tanstack/react-query";

import { syncOltCards } from "../api";

export function useSyncOltCards() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (oltId: string) => syncOltCards(oltId),

    onSuccess: (_data, oltId) => {
      queryClient.invalidateQueries({
        queryKey: ["olt-cards", oltId],
      });
    },
  });
}

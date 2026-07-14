import { useQuery } from "@tanstack/react-query";

import { getOnuDetail } from "../api";

export function useOnuDetail(
  oltId: string,
  interfaceName: string,
) {
  return useQuery({
    queryKey: [
      "onu-detail",
      oltId,
      interfaceName,
    ],

    queryFn: async () => {
      const result =
        await getOnuDetail(
          oltId,
          interfaceName,
        );

      if (Array.isArray(result)) {
        return result[result.length - 1];
      }

      return result;
    },

    enabled:
      !!oltId &&
      !!interfaceName,

    staleTime: 60000,
  });
}
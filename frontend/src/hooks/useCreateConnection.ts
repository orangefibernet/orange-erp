import { useMutation } from "@tanstack/react-query";

import {
  createConnection,
  type CreateConnectionRequest,
} from "../api/connection.api";

export function useCreateConnection() {
  return useMutation({
    mutationFn: (
      payload: CreateConnectionRequest,
    ) => createConnection(payload),
  });
}
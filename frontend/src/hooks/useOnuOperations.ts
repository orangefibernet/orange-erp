import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  disableOnu,
  enableOnu,
  factoryResetOnu,
  rebootOnu,
  renameOnu,
} from "../api";

interface OnuOperation {
  oltId: string;
  interfaceName: string;
}

interface RenameOnuOperation
  extends OnuOperation {
  name: string;
}

function invalidate(
  queryClient: ReturnType<typeof useQueryClient>,
  oltId: string,
  interfaceName: string,
) {
  queryClient.invalidateQueries({
    queryKey: [
      "onu-detail",
      oltId,
      interfaceName,
    ],
  });

  queryClient.invalidateQueries({
    queryKey: [
      "onus",
      oltId,
    ],
  });
}

export function useRebootOnu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oltId,
      interfaceName,
    }: OnuOperation) =>
      rebootOnu(
        oltId,
        interfaceName,
      ),

    onSuccess: (_, variables) => {
      invalidate(
        queryClient,
        variables.oltId,
        variables.interfaceName,
      );
    },
  });
}

export function useEnableOnu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oltId,
      interfaceName,
    }: OnuOperation) =>
      enableOnu(
        oltId,
        interfaceName,
      ),

    onSuccess: (_, variables) => {
      invalidate(
        queryClient,
        variables.oltId,
        variables.interfaceName,
      );
    },
  });
}

export function useDisableOnu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oltId,
      interfaceName,
    }: OnuOperation) =>
      disableOnu(
        oltId,
        interfaceName,
      ),

    onSuccess: (_, variables) => {
      invalidate(
        queryClient,
        variables.oltId,
        variables.interfaceName,
      );
    },
  });
}

export function useFactoryResetOnu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oltId,
      interfaceName,
    }: OnuOperation) =>
      factoryResetOnu(
        oltId,
        interfaceName,
      ),

    onSuccess: (_, variables) => {
      invalidate(
        queryClient,
        variables.oltId,
        variables.interfaceName,
      );
    },
  });
}

export function useRenameOnu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oltId,
      interfaceName,
      name,
    }: RenameOnuOperation) =>
      renameOnu(
        oltId,
        interfaceName,
        name,
      ),

    onSuccess: (_, variables) => {
      invalidate(
        queryClient,
        variables.oltId,
        variables.interfaceName,
      );
    },
  });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../api/axios";

export interface CreateCustomerDto {
  companyId: string;
  branchId: string;

  customerCode: string;

  firstName: string;
  lastName?: string;
  fullName: string;

  mobile: string;
  alternateMobile?: string;

  email?: string;

  customerType?: string;
  status?: string;

  installationAddress: string;

  village?: string;
 mandal?: string;
  district?: string;
  state?: string;
  pincode?: string;

  remarks?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      customer: CreateCustomerDto,
    ) => {
      const response =
        await api.post<ApiResponse<any>>(
          "/customers",
          customer,
        );

      return response.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}
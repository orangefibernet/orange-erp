import api from "./axios";

export interface CreateConnectionRequest {
  customerId: string;
  subscriptionId: string;

  connectionNumber: string;

  pppoeUsername: string;
  pppoePassword: string;

  serviceType: string;

  status?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function createConnection(
  payload: CreateConnectionRequest,
) {
  const response =
    await api.post<ApiResponse<any>>(
      "/connections",
      payload,
    );

  return response.data.data;
}
import api from "./axios";

export interface Olt {
  id: string;

  companyId: string;
  branchId: string;

  name: string;

  vendor: string;
  model: string;

  managementIp: string;

  protocol: string;

  telnetPort: number;
  sshPort: number;

  username: string;

  location: string;

  status: string;

  remarks: string | null;

  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getOlts() {
  const response =
    await api.get<ApiResponse<Olt[]>>("/olt");

  return response.data.data;
}

export async function getOlt(id: string) {
  const response =
    await api.get<ApiResponse<Olt>>(
      `/olt/${id}`,
    );

  return response.data.data;
}
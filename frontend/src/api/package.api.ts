import api from "./axios";

export interface Package {
  id: string;

  companyId: string;

  code: string;
  name: string;

  packageType: string;

  downloadMbps: number;
  uploadMbps: number;

  monthlyPrice: number;

  billingCycle: string;

  validityDays: number;

  radiusGroup?: string;

  priority: number;

  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getPackages(): Promise<Package[]> {
  const response =
    await api.get<ApiResponse<Package[]>>(
      "/package",
    );

  return response.data.data;
}
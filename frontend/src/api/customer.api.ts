import api from "./axios";

export interface Customer {
  id: string;
  customerCode: string;

  firstName: string;
  lastName?: string;
  fullName: string;

  mobile: string;
  alternateMobile?: string;

  email?: string;

  customerType: string;
  status: string;

  installationAddress: string;

  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
  pincode?: string;

  remarks?: string;

  createdAt: string;
  updatedAt: string;

  company?: {
    id: string;
    name: string;
  };

  branch?: {
    id: string;
    name: string;
  };

  subscriptions?: unknown[];
  connections?: unknown[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}

export interface CustomerListResponse {
  items: Customer[];
  pagination: Pagination;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CustomerQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  companyId?: string;
  branchId?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export async function getCustomers(
  query: CustomerQuery = {},
): Promise<CustomerListResponse> {
  const response =
    await api.get<ApiResponse<CustomerListResponse>>(
      "/customers",
      {
        params: query,
      },
    );

  return response.data.data;
}
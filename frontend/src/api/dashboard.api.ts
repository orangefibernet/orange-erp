import api from "./axios";

export interface DashboardResponse {
  customers: {
    total: number;
    active: number;
  };

  subscriptions: {
    total: number;
    active: number;
  };

  connections: {
    total: number;
    active: number;
  };

  network: {
    olts: number;
    ponPorts: number;
    onus: number;
    onlineOnus: number;
    offlineOnus: number;
  };

  opticalPower: {
    normal: number;
    warning: number;
    critical: number;
  };

  ponUtilization: Array<{
    id: string;
    name: string;
    capacity: number;
    configured: number;
    online: number;
    utilization: number;
  }>;

  billing: {
    pendingBills: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getDashboardSummary() {
  const response =
    await api.get<ApiResponse<DashboardResponse>>(
      "/dashboard",
    );

  return response.data.data;
}
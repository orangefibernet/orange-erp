import api from "./axios";

export interface OltCard {
  rack: number;
  shelf: number;
  slot: number;

  configuredType: string;
  realType: string;

  portCount: number;

  hardwareVersion: string;
  softwareVersion: string;

  status: string;
}

export interface PonPort {
  id: string;

  rack: number;
  shelf: number;
  slot: number;

  portNumber: number;

  name: string;

  capacity: number;

  configuredOnuCount: number;
  onlineOnuCount: number;

  status: string;

  onlineOnus: number;
  offlineOnus: number;
  totalOnus: number;
}

export interface OnuState {
  rack: number;
  shelf: number;
  slot: number;

  pon: number;

  onuId: number;

  onuIndex: string;

  interfaceName: string;

  adminState: string;
  omccState: string;
  phaseState: string;

  channel: string;

  online: boolean;

  discoveredAt: string;
}

export interface OnuDetail {
  rack: number;
  shelf: number;
  pon: number;

  onuId: number;

  onuIndex: string;

  interfaceName: string;

  serialNumber: string;
  password: string;

  vendor: string;
  model: string;

  firmwareVersion: string;
  hardwareVersion: string;

  authenticationType: string;

  registrationTime: string;

  description: string;

  distance: string;

  status: string;

  discoveredAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getOltCards(
  id: string,
) {
  const response =
    await api.get<ApiResponse<OltCard[]>>(
      `/network-management/olt/${id}/cards`,
    );

  return response.data.data;
}

export async function getPonPorts(
  id: string,
) {
  const response =
    await api.get<ApiResponse<PonPort[]>>(
      `/network-management/olt/${id}/pon-ports`,
    );

  return response.data.data;
}

export async function getOnus(
  id: string,
) {
  const response =
    await api.get<ApiResponse<OnuState[]>>(
      `/network-management/olt/${id}/onus`,
    );

  return response.data.data;
}

export async function getOnuDetail(
  oltId: string,
  interfaceName: string,
) {
  const response =
    await api.get<
      ApiResponse<OnuDetail | OnuDetail[]>
    >(
      `/network-management/olt/${oltId}/onus/${encodeURIComponent(
        interfaceName,
      )}/detail`,
    );

  return response.data.data;
}

export async function syncOltCards(
  oltId: string,
) {
  const response =
    await api.post<ApiResponse<any>>(
      `/network-management/olt/${oltId}/sync/cards`,
    );

  return response.data.data;
}
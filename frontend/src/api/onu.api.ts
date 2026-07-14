import api from "./axios";

export interface OnuDetail {
  interfaceName: string;
  onuIndex: string;
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
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getOnuDetail(
  oltId: string,
  interfaceName: string,
) {
  const response =
    await api.get<ApiResponse<OnuDetail[]>>(
      `/network-management/olt/${oltId}/onus/${encodeURIComponent(interfaceName)}/detail`,
    );

  return response.data.data[0];
}

export async function rebootOnu(
  oltId: string,
  interfaceName: string,
) {
  return api.post(
    `/network-management/olt/${oltId}/onus/reboot`,
    {
      interfaceName,
    },
  );
}

export async function enableOnu(
  oltId: string,
  interfaceName: string,
) {
  return api.post(
    `/network-management/olt/${oltId}/onus/enable`,
    {
      interfaceName,
    },
  );
}

export async function disableOnu(
  oltId: string,
  interfaceName: string,
) {
  return api.post(
    `/network-management/olt/${oltId}/onus/disable`,
    {
      interfaceName,
    },
  );
}

export async function factoryResetOnu(
  oltId: string,
  interfaceName: string,
) {
  return api.post(
    `/network-management/olt/${oltId}/onus/factory-reset`,
    {
      interfaceName,
    },
  );
}

export async function renameOnu(
  oltId: string,
  interfaceName: string,
  name: string,
) {
  return api.post(
    `/network-management/olt/${oltId}/onus/rename`,
    {
      interfaceName,
      name,
    },
  );
}
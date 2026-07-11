export interface ZteOnuDetail {
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

  discoveredAt: Date;
}
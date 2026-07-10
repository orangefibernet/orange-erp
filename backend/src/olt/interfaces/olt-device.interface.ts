export interface OltDevice {
  connect(oltId: string): Promise<void>;

  disconnect(): Promise<void>;

  testConnection(): Promise<boolean>;

  discoverOnus(): Promise<any[]>;

  authorizeOnu(
    ponPort: string,
    serialNumber: string,
    lineProfile: string,
    serviceProfile: string,
  ): Promise<any>;

  deleteOnu(
    onuId: string,
  ): Promise<void>;

  rebootOnu(
    onuId: string,
  ): Promise<void>;

  enableOnu(
    onuId: string,
  ): Promise<void>;

  disableOnu(
    onuId: string,
  ): Promise<void>;

  getOpticalPower(
    onuId: string,
  ): Promise<any>;

  configureServicePort(
    onuId: string,
    vlan: number,
  ): Promise<void>;
}

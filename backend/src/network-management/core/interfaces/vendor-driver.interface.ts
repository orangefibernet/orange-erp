import { DeviceConnection } from '../../interfaces/device-connection.interface';

export interface VendorDriver {
  connect(
    connection: DeviceConnection,
  ): Promise<void>;

  disconnect(): Promise<void>;

  execute(
    command: string,
  ): Promise<string>;

  testConnection(
    connection: DeviceConnection,
  ): Promise<unknown>;
}
import { DeviceConnection } from './device-connection.interface';
import { NetworkSession } from './network-session.interface';

export interface NetworkTransport {
  connect(
    connection: DeviceConnection,
  ): Promise<NetworkSession>;
}
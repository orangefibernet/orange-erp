export interface DeviceSession {
  id: string;

  host: string;

  port: number;

  connected: boolean;

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  execute(command: string): Promise<string>;
}
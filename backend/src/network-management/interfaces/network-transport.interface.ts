export interface NetworkTransport {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  execute(
    command: string,
  ): Promise<string>;

  isConnected(): boolean;
}

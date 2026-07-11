export interface NetworkSession {
  execute(command: string): Promise<string>;
  disconnect(): Promise<void>;
}
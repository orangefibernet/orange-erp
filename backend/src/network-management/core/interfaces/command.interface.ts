export interface Command {
  name: string;

  command: string;

  description?: string;

  timeout?: number;
}
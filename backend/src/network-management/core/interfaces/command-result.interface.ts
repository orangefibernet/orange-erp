export interface CommandResult<T = unknown> {
  success: boolean;

  command: string;

  executionTime: number;

  rawOutput: string;

  parsedOutput?: T;
}
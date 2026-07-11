export interface CommandResult {
  /**
   * Whether the command executed successfully.
   */
  success: boolean;

  /**
   * CLI command that was executed.
   */
  command: string;

  /**
   * Raw CLI output.
   */
  output: string;

  /**
   * Command execution time in milliseconds.
   */
  executionTimeMs: number;

  /**
   * Error message (if any).
   */
  error?: string;

  /**
   * Execution timestamp.
   */
  executedAt: Date;
}
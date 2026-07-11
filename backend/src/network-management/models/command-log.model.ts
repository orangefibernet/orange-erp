export interface CommandLog {
  /**
   * OLT ID.
   */
  oltId: string;

  /**
   * CLI command.
   */
  command: string;

  /**
   * Raw CLI output.
   */
  output: string;

  /**
   * Command success.
   */
  success: boolean;

  /**
   * Duration in milliseconds.
   */
  executionTimeMs: number;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Execution timestamp.
   */
  executedAt: Date;
}
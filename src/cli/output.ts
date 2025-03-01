import { stdout, stderr } from "node:process";

import chalk from "chalk";
import { ErrorWithStep } from "../lib/interfaces/error.ts";
/**
 * This module uses process.stdout and process.stderr streams directly instead of console.log
 * to ensure proper handling of Unix-style pipes and redirections. This approach allows:
 *
 * 1. Separation of actual output (stdout) from diagnostic information (stderr)
 * 2. Compatibility with command-line piping (e.g., `command | grep pattern`)
 * 3. Proper exit code propagation in pipeline chains
 * 4. Consistent behavior across different operating systems and environments
 *
 * This design follows Unix philosophy where programs should do one thing well
 * and work together through standard streams.
 */

const writeStream = (stream: NodeJS.WritableStream, message: string) => {
  stream.write(message + "\n");
};

/**
 * Primary output for the CLI's final result. Writes plain text to stdout.
 * @param message - The final output to display, should be parseable by other tools
 */
const output = (message: string) => writeStream(stdout, message);

/**
 * Operational logging for ancillary information. Writes to stderr with gray [LOG] prefix.
 * @param message - Diagnostic information about the CLI's execution process
 */
const log = (message: string) => {
  // TODO - Use a level system for logging.
  const timestamp = new Date().toTimeString().split(" ")[0];
  writeStream(stderr, chalk.gray(`[LOG - ${timestamp}] ${message}`));
};

/**
 * Error reporting for user-facing issues. Writes to stderr in red.
 * @param message - Error description with potential recovery instructions
 */
const outputError = (error: ErrorWithStep) => {
  const timestamp = new Date().toTimeString().split(" ")[0];
  writeStream(
    stderr,
    chalk.red(`[ERROR - ${timestamp}] ${error.step}: ${error.message}`)
  );
};

export { output, outputError, log };

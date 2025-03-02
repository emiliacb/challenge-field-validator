import { createWriteStream } from "node:fs";
import { stdout, stderr } from "node:process";

import chalk from "chalk";

import { ErrorWithStep } from "../lib/interfaces/error.js";

const colorMap = {
  ERROR: chalk.red,
  WARN: chalk.yellow,
  INFO: chalk.gray,
};

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

export const writeStream = (stream: NodeJS.WritableStream, message: string) => {
  stream.write(message + "\n");
};

/**
 * Primary output for the CLI's final result. Writes plain text to stdout.
 * @param message - The final output to display, should be parseable by other tools
 */
export const outputPipe = (message: string) => writeStream(stdout, message);

/**
 * Output for the CLI's final result. Writes plain text to a file.
 * @param message - The final output to display, should be parseable by other tools
 * @param fileName - The name of the file to write the output to
 */
export const outputFile = (message: string, fileName: string) => {
  writeStream(createWriteStream(fileName), message);
};

/**
 * Operational logging for informational messages. Writes to stderr with appropriate styling based on log level.
 * @param message - Diagnostic information about the CLI's execution process
 * @param level - Log level: "INFO" (default), "WARN", or "ERROR"
 */
export const log = {
  info: (message: string) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    writeStream(stderr, colorMap.INFO(`[INFO - ${timestamp}] ${message}`));
  },
  warn: (message: string) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    writeStream(stderr, colorMap.WARN(`[WARN - ${timestamp}] ${message}`));
  },
  error: (error: ErrorWithStep) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    writeStream(
      stderr,
      chalk.red(`[ERROR - ${timestamp}] ${error.step}: ${error.message}`)
    );
  },
};

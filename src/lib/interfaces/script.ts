import { ValidationResults } from "../../core/validation/validation-results.js";

/**
 * Type representing the output of a script.
 * Currently defined as an array of validation results, but can be extended
 * to support other types of outputs in the future as needed.
 */
export type ScriptOutput = ValidationResults[] | string;

/**
 * Interface representing a runnable script with standardized input/output handling.
 * Scripts can be executed individually or composed together through piping operations.
 */
export interface Script {
  /** Descriptive name of the script */
  name: string;

  /** Detailed description of what the script does */
  description: string;

  /**
   * Provides a default source of input as an async generator.
   * Using generators allows for efficient streaming of data between scripts,
   * enabling composable pipelines where output from one script can be piped
   * as input to another without loading everything into memory.
   */
  getDefaultInput: () => AsyncGenerator<string, void, unknown>;

  /**
   * Executes the script's logic and returns a promise with the result.
   * @param getInput Optional input generator that overrides the default input.
   * When scripts are piped together, this parameter receives the output generator
   * from the previous script in the pipeline.
   */
  run: (
    getInput?: () => AsyncGenerator<string, void, unknown>
  ) => Promise<ScriptOutput>;
}

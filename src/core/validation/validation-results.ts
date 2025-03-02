import { log } from "../../cli/output.js";
import { ValidationResultData } from "../../lib/types/validation.js";
/**
 * Class for validation results used across different scripts.
 * This class helps maintain a consistent format for validation outputs
 * throughout the application. It can be extended in the future to include
 * additional types of validations as needed, such as specific validation
 * for different annotation types, image quality checks, or custom validation
 * rules for different projects.
 */
export class ValidationResults {
  id: string;
  type: ValidationResultData["type"];
  isValid: ValidationResultData["isValid"];
  errors: ValidationResultData["errors"];
  warnings: ValidationResultData["warnings"];
  payload: ValidationResultData["payload"];

  constructor({
    id,
    type,
  }: {
    id: string;
    type: ValidationResultData["type"];
  }) {
    this.id = id;
    this.type = type;
    this.isValid = true;
    this.errors = [];
    this.warnings = [];
    this.payload = {};
  }

  /**
   * Adds an error message to the validation results
   * @param message The error message to add
   */
  addError(message: string): this {
    this.errors.push(message);
    this.isValid = false;
    return this;
  }

  /**
   * Adds a warning message to the validation results
   * @param message The warning message to add
   */
  addWarning(message: string): this {
    this.warnings.push(message);
    return this;
  }

  /**
   * Adds or updates a value in the payload
   * @param payload The payload to add
   */
  addPayload(payload: Record<string, any>): this {
    this.payload = { ...this.payload, ...payload };
    return this;
  }

  /**
   * Checks if there are any issues (errors or warnings)
   * @returns True if there are any issues
   */
  hasIssues(): boolean {
    if (this.type === "annotation") {
      return this.errors.length > 0 || this.warnings.length > 0;
    }

    if (this.type === "task") {
      const annotations = Object.values(this.payload);

      log.info(JSON.stringify(this.payload, null, 2));

      return (
        this.errors.length > 0 ||
        this.warnings.length > 0 ||
        annotations.some((annotation) => annotation?.hasIssues())
      );
    }
  }

  /**
   * Returns the validation results as a plain object
   * This method is automatically called by JSON.stringify()
   * @returns The validation results data
   */
  toJSON(): ValidationResultData {
    return {
      id: this.id,
      type: this.type,
      isValid: this.isValid,
      errors: this.errors,
      warnings: this.warnings,
      payload: this.payload,
    };
  }
}

/**
 * Class for validation results used across different scripts.
 * This class helps maintain a consistent format for validation outputs
 * throughout the application. It can be extended in the future to include
 * additional types of validations as needed, such as specific validation
 * for different annotation types, image quality checks, or custom validation
 * rules for different projects.
 */
export class ValidationResults {
  isValid: boolean = true;
  errors: string[] = [];
  warnings: string[] = [];
  payload: Record<string, any> = {};

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
   * Adds a payload to the validation results
   * @param payload The payload to add
   */
  addPayload(payload: Record<string, any>): this {
    this.payload = { ...this.payload, ...payload };
    return this;
  }

  /**
   * Returns the validation results as a JSON string
   * @returns The validation results as a JSON string
   */
  toJSON(): string {
    return JSON.stringify(
      {
        isValid: this.isValid,
        errors: this.errors,
        warnings: this.warnings,
        payload: this.payload,
      },
      null,
      2
    );
  }

  /**
   * Checks if there are any issues (errors or warnings)
   * @returns True if there are any issues
   */
  hasIssues(): boolean {
    return this.errors.length > 0 || this.warnings.length > 0;
  }
}

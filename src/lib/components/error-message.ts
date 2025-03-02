export function errorMessage(errors: string[], warnings: string[]): string {
  return errors.length > 0
    ? `<div class="error-message">
        Errors: ${errors.join(", ")}
      </div>`
    : warnings.length > 0
    ? `<div class="warning-message">
        Warnings: ${warnings.join(", ")}
      </div>`
    : "";
}

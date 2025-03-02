import { ValidationResults } from "../../core/validation/validation-results.js";
import { errorMessage } from "./error-message.js";

export function annotationRow(task: ValidationResults): string {
  const { payload } = task;

  return Object.entries(payload)
    .map(([uuid, data]) => {
      const { annotation, results } = data;
      if (results.hasIssues()) {
        return `
          <div class="annotation">
            UUID: ${uuid}<br>
            Label: ${annotation.label}<br>
            ${errorMessage(results.errors, results.warnings)}
          </div>
        `;
      }
      return "";
    })
    .join("");
}

import { ValidationResults } from "../../core/validation/validation-results.js";
import { errorMessage } from "./error-message.js";
import { annotationRow } from "./annotation-row.js";

const getTaskUrl = (taskId: string) =>
  `https://dashboard.scale.com/audit?taskId=${taskId}`;

const templateRow = (
  statusColor: string,
  statusText: string,
  result: ValidationResults
) => `
  <div class="validation-row">
    <div class="status ${
      statusColor === "green" ? "status--valid" : "status--invalid"
    }">
      ${statusText}
    </div>
    <a href="${getTaskUrl(
      result.id
    )}" target="_blank" rel="noopener noreferrer">View Audit</a>
    ${errorMessage(result.errors, result.warnings)}
    ${annotationRow(result)}
  </div>
`;

export function validationRow(result: ValidationResults): string {
  const { isValid } = result;
  const statusColor = isValid ? "green" : "red";
  const statusText = isValid ? "✓ Valid" : "✗ Invalid";

  return templateRow(statusColor, statusText, result);
}

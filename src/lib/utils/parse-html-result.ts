import { ScriptOutput } from "../interfaces/script.js";
import { ValidationResults } from "../../core/validation/validation-results.js";
import { log } from "../../cli/output.js";

const getTaskUrl = (taskId: string) =>
  `https://dashboard.scale.com/audit?taskId=${taskId}`;

const errorMessage = (errors: string[], warnings: string[]): string =>
  errors.length > 0
    ? `<div style="color: red; margin-bottom: 10px;">
        Errors: ${errors.join(", ")}
      </div>`
    : warnings.length > 0
    ? `<div style="color: orange; margin-bottom: 10px;">
        Warnings: ${warnings.join(", ")}
      </div>`
    : "";

function annotationRow(task: ValidationResults): string {
  const { payload } = task;

  return Object.entries(payload)
    .map(([uuid, data]) => {
      const { annotation, results } = data;
      if (results.hasIssues()) {
        return `
          <div style="margin: 10px 0; padding: 10px; border-left: 3px solid #eee;">
            UUID: ${uuid}<br>
            Label: ${annotation.label}<br>
            ${errorMessage(results.errors, results.warnings)}
          </div>
        `;
      }
      return ""; // Explicit return for when hasIssues() is false
    })
    .join("");
}

function row(result: ValidationResults): string {
  const { isValid } = result;
  const statusColor = isValid ? "green" : "red";
  const statusText = isValid ? "✓ Valid" : "✗ Invalid";

  return `
    <div style="border: 1px solid #ccc; margin: 10px; padding: 15px; border-radius: 4px;">
      <div style="color: ${statusColor}; font-weight: bold; margin-bottom: 10px;">
        ${statusText}
      </div>
      <a href="${getTaskUrl(
        result.id
      )}" target="_blank" rel="noopener noreferrer">Task</a>
      ${errorMessage(result.errors, result.warnings)}
      ${annotationRow(result)}
    </div>
  `;
}

function parseResultHtml(results: ScriptOutput): string {
  try {
    if (typeof results === "string") {
      throw new Error("Invalid results: Expected ValidationResults array");
    }

    return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        <h1>Validation Results</h1>
        ${results.map((result) => row(result as ValidationResults)).join("")}
      </body>
    </html>
    `;
  } catch (error) {
    error.step = "parseResultHtml";
    log.error(error);
    throw error;
  }
}

export { parseResultHtml };

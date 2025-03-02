import { ScriptOutput } from "../interfaces/script.js";
import { ValidationResults } from "../../core/validation/validation-results.js";
import { log } from "../../cli/output.js";
import { validationRow } from "../components/validation-row.js";

const templateRows = (rows: string) => `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation Results</title>
    <style>
      .validation-row {
        border: 1px solid #ccc;
        margin: 10px;
        padding: 15px;
        border-radius: 4px;
      }
      .status {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .status--valid { color: green; }
      .status--invalid { color: red; }
      .annotation {
        margin: 10px 0;
        padding: 10px;
        border-left: 3px solid #eee;
      }
      .error-message {
        color: red;
        margin-bottom: 10px;
      }
      .warning-message {
        color: orange;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Validation Results</h1>
    ${rows}
  </body>
</html>`;

function parseResultHtml(results: ScriptOutput): string {
  try {
    if (typeof results === "string") {
      throw new Error("Invalid results: Expected ValidationResults array");
    }

    return templateRows(
      results
        .map((result) => validationRow(result as ValidationResults))
        .join("")
    );
  } catch (error) {
    error.step = "parseResultHtml";
    log.error(error);
    throw error;
  }
}

export { parseResultHtml };

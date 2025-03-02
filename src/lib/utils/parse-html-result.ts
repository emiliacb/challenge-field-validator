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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: "Montserrat", sans-serif;
        padding: 20px;
        background-color:rgb(180, 180, 180);
      }
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      .validation-row {
        background-color:rgb(230, 230, 230);
        border: 1px solid #ccc;
        margin: 10px;
        padding: 15px;
        border-radius: 4px;
        max-width: 800px;
        margin: 0 auto;
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
        border-left: 3px solidrgb(180, 180, 180);
      }
      .error-message {
        color: rgb(169, 14, 9);
        margin-bottom: 10px;
      }
      .warning-message {
        color:rgb(169, 134, 9);
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

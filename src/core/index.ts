import { getUserInput, log, outputPipe, outputFile } from "../cli/index.js";
import { getScript } from "../scripts/index.js";
import { parseResultHtml } from "../lib/utils/parse-html-result.js";

async function runScript() {
  try {
    const { scriptName, outputFormat, pipe } = await getUserInput();
    const script = await getScript(scriptName);
    const result = await script.run();

    if (scriptName === "sheep") {
      log.warn(
        `The selected script can't return a ${outputFormat}, becasue it's a sheep`
      );
      return outputPipe(result as string);
    }

    // TODO: refactor this switch to be more readable
    switch (outputFormat) {
      case "json":
        if (pipe) {
          return outputPipe(JSON.stringify(result, null, 2));
        }
        return outputFile(
          JSON.stringify(result, null, 2),
          `result-${Date.now()}.json`
        );
      case "html":
        if (pipe) {
          return outputPipe(parseResultHtml(result));
        }
        return outputFile(parseResultHtml(result), `result-${Date.now()}.html`);
      default:
        if (pipe) {
          return outputPipe(JSON.stringify(result, null, 2));
        }
        return outputFile(
          JSON.stringify(result, null, 2),
          `result-${Date.now()}.json`
        );
    }
  } catch (error) {
    error.step = "runScript";
    log.error(error);
    throw error;
  }
}

export { runScript };

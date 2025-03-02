import { getUserInput, log, output } from "../cli/index.js";
import { getScript } from "../scripts/index.js";
import { parseResultHtml } from "../lib/utils/parse-html-result.js";

async function runScript() {
  try {
    const { scriptName, outputFormat } = await getUserInput();
    const script = await getScript(scriptName);
    const result = await script.run();

    if (scriptName === "sheep") {
      log.warn(
        `The selected script can't return a ${outputFormat}, becasue it's a sheep`
      );
    }

    switch (outputFormat) {
      case "json":
        return output(JSON.stringify(result, null, 2));
      case "html":
        return output(parseResultHtml(result));
      default:
        return output(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    error.step = "runScript";
    log.error(error);
    throw error;
  }
}

export { runScript };

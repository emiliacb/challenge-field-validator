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
        `The selected script can't return a ${outputFormat}, because sheeps don't know how to do that.`
      );
      return outputPipe(result as string);
    }

    const output = pipe ? outputPipe : outputFile;
    const fileName = `${scriptName}-${Date.now()}.${outputFormat}`;

    switch (outputFormat) {
      case "json":
        return output(JSON.stringify(result, null, 2), fileName);
      case "html":
        return output(parseResultHtml(result), fileName);
      default:
        return output(JSON.stringify(result, null, 2), fileName);
    }
  } catch (error) {
    error.step = "runScript";
    log.error(error);
    throw error;
  }
}

export { runScript };

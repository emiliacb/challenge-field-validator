import { getUserInput, output, outputError } from "../cli/index.ts";
import { getScript } from "../scripts/index.ts";

async function runScript() {
  try {
    const { scriptName } = await getUserInput();
    const script = getScript(scriptName);
    const result = await script.run();

    return output(result);
  } catch (error) {
    error.step = "runScript";
    return outputError(error);
  }
}

export { runScript };

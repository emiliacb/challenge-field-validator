import { getUserInput, output, outputError } from "../cli/index.js";
import { getScript } from "../scripts/index.js";

async function runScript() {
  try {
    const { scriptName } = await getUserInput();
    const script = await getScript(scriptName);
    const result = await script.run();

    return output(result);
  } catch (error) {
    error.step = "runScript";
    outputError(error);
    throw error;
  }
}

export { runScript };

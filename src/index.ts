import { getInput, output, outputError } from "./cli/index.ts";
import { getScript } from "./scripts/index.ts";

async function main() {
  try {
    const { scriptName } = await getInput();
    const script = getScript(scriptName);

    const data = await script.getDefaultInput();
    const result = await script.run(data);

    return output(result);
  } catch (error) {
    return outputError(error.message);
  }
}

main();

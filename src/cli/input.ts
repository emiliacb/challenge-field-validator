import { stderr } from "node:process";

import { program } from "commander";
import { createPromptModule } from "inquirer";

import { SCRIPT_LIST } from "../scripts/index.js";

const prompt = createPromptModule({ output: stderr });

// TODO - Handle stdin file reading
const getUserInput = async () => {
  program.option("-s, --script <type>", "Script to run");
  program.parse();

  const option = program.opts();

  let scriptName = option.script;

  if (!scriptName) {
    // Load all scripts to access their name and description
    const loadedScripts = await Promise.all(
      Object.entries(SCRIPT_LIST).map(async ([key, loader]) => {
        const script = await loader();
        return { key, script };
      })
    );

    const answer = await prompt([
      {
        type: "list",
        name: "script",
        message: "Select a script to run:",
        choices: loadedScripts.map(({ key, script }) => ({
          name: `${script.name} - ${script.description}`,
          value: key,
        })),
      },
    ]);
    scriptName = answer.script;
  }

  return { scriptName };
};

export { getUserInput };

import { stderr } from "node:process";

import { program } from "commander";
import { createPromptModule } from "inquirer";

import { SCRIPT_LIST } from "../scripts/index.ts";

const prompt = createPromptModule({ output: stderr });

// TODO - Handle stdin file reading
const getUserInput = async () => {
  program.option("-s, --script <type>", "Script to run");
  program.parse();

  const option = program.opts();

  let scriptName = option.script;

  if (!scriptName) {
    const answer = await prompt([
      {
        type: "list",
        name: "script",
        message: "Select a script to run:",
        choices: Object.keys(SCRIPT_LIST).map((key) => ({
          name: `${key} - ${SCRIPT_LIST[key].description}`,
          value: key,
        })),
      },
    ]);
    scriptName = answer.script;
  }

  return { scriptName };
};

export { getUserInput };

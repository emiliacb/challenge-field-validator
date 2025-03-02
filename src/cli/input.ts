import { stderr } from "node:process";

import { program } from "commander";
import { createPromptModule } from "inquirer";

import { SCRIPT_LIST } from "../scripts/index.js";

const prompt = createPromptModule({ output: stderr });

const getUserInput = async () => {
  program.option("-s, --script <type>", "Script to run");
  program.option("-o, --output <type>", "Output format");
  program.parse();

  const option = program.opts();

  let scriptName = option.script;
  let outputFormat = option.output;

  if (!scriptName) {
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

  if (!outputFormat) {
    const answer = await prompt([
      {
        type: "list",
        name: "output",
        message: "Select an output format:",
        choices: ["json", "html"],
      },
    ]);
    outputFormat = answer.output;
  }

  return { scriptName, outputFormat };
};

export { getUserInput };

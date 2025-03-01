import { program } from "commander";

// TODO - Handle stdin file reading
const getInput = () => {
  program
    .argument("[file]", "File to read [Optional]")
    .requiredOption("-s, --script <type>", "Script to run [Required]");

  program.parse();

  const option = program.opts();
  const script = option.script;

  return { script };
};

export { getInput };

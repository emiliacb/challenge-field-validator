import { outputError } from "./cli/output.ts";
import { runScript } from "./core/index.ts";

import dotenv from "dotenv";

async function main() {
  try {
    dotenv.config();
    await runScript();
  } catch (error) {
    error.step = "main";
    return outputError(error);
  }
}

main();

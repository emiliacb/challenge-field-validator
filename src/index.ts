import dotenv from "dotenv";

import { outputError } from "./cli/output.js";
import { runScript } from "./core/index.js";

async function main() {
  try {
    dotenv.config();
    await runScript();
  } catch (error) {
    error.step = "main";
    outputError(error);
  }
}

main();

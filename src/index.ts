import { outputError } from "./cli/output.js";
import { runScript } from "./core/index.js";

import dotenv from "dotenv";

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

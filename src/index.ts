#!/usr/bin/env node

import dotenv from "dotenv";

import { log } from "./cli/output.js";
import { runScript } from "./core/index.js";

async function main() {
  try {
    dotenv.config();
    await runScript();
  } catch (error) {
    error.step = "main";
    log.error(error);
  }
}

main();

import dotenv from "dotenv";

// This file is imported by the test command in package.json:
// "test": "tsx --import ./tests/unit/setup.mjs --test \"tests/**/*.test.ts\""
// It performs any necessary initialization before tests are executed
function setup() {
  dotenv.config();
}

setup();

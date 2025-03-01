import { outputError } from "../cli/output.ts";
import { Script } from "../lib/interfaces/script.ts";

import sheep from "./sheep.ts";
import trafficLights from "./traffic-lights/index.ts";

const SCRIPT_LIST: Record<string, Script> = {
  sheep,
  trafficLights,
} as const;

const getScript = (name: string) => {
  try {
    const script = SCRIPT_LIST[name];

    if (!script) {
      throw new Error(`Script ${name} not found`);
    }

    return script;
  } catch (error) {
    error.step = "getScript";
    outputError(error);
  }
};

export { SCRIPT_LIST, getScript };

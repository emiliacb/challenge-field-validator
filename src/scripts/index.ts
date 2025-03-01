import { Script } from "../lib/interfaces/script.js";
import trafficLights from "./traffic_lights.js";

const SCRIPT_LIST: Record<string, Script> = {
  trafficLights,
} as const;

const getScript = (name: string) => {
  const script = SCRIPT_LIST[name];

  if (!script) {
    throw new Error(`Script ${name} not found`);
  }

  return script;
};

export { SCRIPT_LIST, getScript };

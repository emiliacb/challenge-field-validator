import { outputError } from "../lib/cli/output.ts";
import { Script } from "../lib/interfaces/script.ts";

// We use dynamic imports for lazy loading to avoid bundling all scripts
// in the same chunk. This pattern helps reduce initia load time and
// memory usage, which is important if we expect to have many scripts in the future.
// We could move this to a separate file or multiple files in the future without
// having to change the cli code.
const SCRIPT_LIST: Record<string, () => Promise<Script>> = {
  sheep: () => import("./sheep.ts").then((module) => module.default),
  trafficLights: () =>
    import("./traffic-lights/index.ts").then((module) => module.default),
} as const;

const getScript = async (name: string): Promise<Script> => {
  try {
    const scriptLoader = SCRIPT_LIST[name];

    if (!scriptLoader) {
      throw new Error(`Script ${name} not found`);
    }

    return await scriptLoader();
  } catch (error) {
    error.step = "getScript";
    outputError(error);
    throw error;
  }
};

export { SCRIPT_LIST, getScript };

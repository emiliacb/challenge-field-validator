import { Script } from "../../lib/interfaces/script.ts";
import { script } from "./script.ts";
import { getInputsGenerator } from "./get-inputs.ts";

class TrafficLightsScript implements Script {
  name: string = "traffic-lights";
  description: string = "Traffic light verification with pagination support";

  /**
   * Returns a generator that yields pages of data
   * This allows for efficient processing of large datasets
   * by handling one page at a time, maintaining compatibility
   * with the script interface allowing for piped operations.
   * Check @Script interface for more information.
   */
  getDefaultInput() {
    return getInputsGenerator();
  }

  async run(getInputs: () => AsyncGenerator<string, void, unknown>) {
    const inputGenerator = getInputs || this.getDefaultInput.bind(this);
    return script(inputGenerator);
  }
}

export default new TrafficLightsScript();

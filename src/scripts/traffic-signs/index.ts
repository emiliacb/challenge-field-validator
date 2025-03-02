import { Script } from "../../lib/interfaces/script.js";
import { runVerification } from "./run-verification.js";
import { getInputsGenerator } from "./get-inputs.js";

class TrafficSignsScript implements Script {
  name: string = "traffic-signs";
  description: string =
    "Traffic sign detection verification for ObserveSign project";

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
    return runVerification(inputGenerator);
  }
}

export default new TrafficSignsScript();

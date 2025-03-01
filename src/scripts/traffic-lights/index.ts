import { Script } from "../../lib/interfaces/script.ts";
import { script } from "./script.ts";
import { getInputs } from "./get-inputs.ts";

class TrafficLightsScript implements Script {
  name: string = "traffic-lights";
  description: string = "Traffic light verification";

  getDefaultInput(): Promise<string> {
    return getInputs();
  }

  async run(input: string): Promise<string> {
    return script(input);
  }
}

export default new TrafficLightsScript();

import { Script } from "../lib/interfaces/script.js";
import { output } from "../cli/index.js";

class TrafficLightsScript implements Script {
  name: string = "traffic-lights";
  description: string = "Traffic light verification";

  getDefaultInput(): Promise<string> {
    return Promise.resolve("1234567890");
  }

  async run(input: string): Promise<string> {
    output(`Traffic light verification! ${input}`);
    return Promise.resolve(input.replace("345", "###"));
  }
}

export default new TrafficLightsScript();

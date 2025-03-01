import { log } from "../cli/index.js";
import { Script } from "../lib/interfaces/script.js";

// Just a silly script to test the CLI.
// Sheep created by Bob Allison retrieved from https://ascii.co.uk/

class SheepScript implements Script {
  name: string = "sheep";
  description: string = "Displays an ASCII sheep";

  getDefaultInput(): Promise<string> {
    return Promise.resolve("baa");
  }

  async run(getInput?: () => Promise<string>): Promise<string> {
    const input = getInput ? await getInput() : await this.getDefaultInput();

    log("Running sheep script");
    log(
      `Sheep says: ${
        input.length > 100 ? input.substring(0, 97) + "..." : input
      }`
    );

    const sheep = `
           __  _
       .-.'  \`; \`-._  __  _
      (_,         .-:'  \`; \`-._
    ,'o"(        (_,           )
   (__,-'      ,'o"(            )>
      (       (__,-'            )
       \`-'._.--._(             )
          |||  |||\`-'._.--._.-'
                     |||  |||
    `;

    return Promise.resolve(sheep);
  }
}

export default new SheepScript();

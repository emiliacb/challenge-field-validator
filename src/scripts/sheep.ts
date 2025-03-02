import { log } from "../cli/index.js";
import { Script } from "../lib/interfaces/script.js";

// Just a silly script to test the CLI.
// Sheep created by Bob Allison retrieved from https://ascii.co.uk/
class SheepScript implements Script {
  name: string = "sheep??";
  description: string = "Just a silly script to test the CLI.";
  getDefaultInput(): AsyncGenerator<string, void, unknown> {
    return (async function* () {
      yield "baa";
    })();
  }

  async run(
    getInput?: () => AsyncGenerator<string, void, unknown>
  ): Promise<string> {
    const inputGenerator = getInput || this.getDefaultInput.bind(this);
    let input = "";

    for await (const chunk of inputGenerator()) {
      input += chunk;
    }

    log.info("Running sheep script");
    log.info(
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

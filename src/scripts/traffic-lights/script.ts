import { outputError } from "../../cli/output.ts";

const script = async (input: string) => {
  try {
    // The input parameter now contains the data from geti-inputs.ts
    // We just need to format it as JSON
    const data = JSON.parse(input);
    return JSON.stringify(data, null, 2);
  } catch (error) {
    error.step = "traffic-lights:script";
    outputError(error);
  }
};

export { script };

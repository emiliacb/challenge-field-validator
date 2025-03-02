import { log } from "../../cli/output.js";
import { validateAnnotations } from "./validate-annotations.js";
import { ValidationResults } from "../../core/validation/validation-results.js";

const runVerification = async (
  getInputs: () => AsyncGenerator<string, void, unknown>
): Promise<ValidationResults[]> => {
  log.info("Fetching tasks...");

  try {
    const iterator = getInputs();
    const stack: string[] = [];

    for await (const value of iterator) {
      stack.push(value);
    }

    const allTasks: any[] = [];

    for (const pageStr of stack) {
      const pageData = JSON.parse(pageStr);

      if (pageData.docs && Array.isArray(pageData.docs)) {
        allTasks.push(...pageData.docs);
      }
    }

    const validationResults = await Promise.all(
      allTasks.map(async (task) => await validateAnnotations(task))
    );

    if (allTasks.length === 0) {
      throw new Error("No tasks found in the API response");
    }

    return validationResults;
  } catch (error) {
    error.step = "traffic-lights:script";
    log.error(error);
    throw error;
  }
};

export { runVerification };

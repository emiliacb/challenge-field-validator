import { log, outputError } from "../../cli/output.js";
import { validateAnnotations } from "./validate-annotations.js";

const runVerification = async (
  getInputs: () => AsyncGenerator<string, void, unknown>
) => {
  log("Fetching tasks...");

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
      allTasks.map(async (task) => {
        const result = await validateAnnotations(task);
        return {
          id: task.task_id,
          name: task.task_id,
          validation: result,
        };
      })
    );

    if (allTasks.length === 0) {
      throw new Error("No tasks found in the API response");
    }

    return JSON.stringify(validationResults, null, 2);
  } catch (error) {
    error.step = "traffic-lights:script";
    outputError(error);
    throw error;
  }
};

export { runVerification };

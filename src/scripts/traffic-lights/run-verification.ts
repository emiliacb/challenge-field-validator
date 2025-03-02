import { log, outputError } from "../../cli/output.js";

const runVerification = async (
  getInputs: () => AsyncGenerator<string, void, unknown>
) => {
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
        log(pageData);

        const pageTasks = pageData.docs.map((task: any) => ({
          id: task.id,
          name: task.task_id || task.id,
        }));

        allTasks.push(...pageTasks);
      }
    }

    if (allTasks.length === 0) {
      throw new Error("No tasks found in the API response");
    }

    return JSON.stringify(allTasks, null, 2);
  } catch (error) {
    error.step = "traffic-lights:script";
    outputError(error);
    throw error;
  }
};

export { runVerification };

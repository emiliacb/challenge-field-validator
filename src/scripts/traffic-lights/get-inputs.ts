import { outputError } from "../../cli/output.ts";

const getInputs = async () => {
  try {
    const SCALE_BASE_URL = process.env.SCALE_BASE_URL;
    const URL = `${SCALE_BASE_URL}/v1/tasks`;
    const SCALE_LIVE_API_KEY = process.env.SCALE_LIVE_API_KEY;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${SCALE_LIVE_API_KEY}`,
    };

    const queryParams = new URLSearchParams({
      project: "Traffic Sign Detection",
    }).toString();

    const response = await fetch(`${URL}?${queryParams}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    error.step = "traffic-lights:getInputs";
    outputError(error);
    return null;
  }
};

export { getInputs };

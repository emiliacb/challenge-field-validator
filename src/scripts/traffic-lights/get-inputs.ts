import { log, outputError } from "../../cli/output.js";

async function* getInputsGenerator() {
  try {
    let nextCursor = null;
    let hasMorePages = true;
    let pageCount = 0;

    while (hasMorePages) {
      pageCount++;

      const { data, cursor } = await fetchPage(nextCursor);
      yield data;

      if (cursor) {
        nextCursor = cursor;
      } else {
        hasMorePages = false;
      }
    }
  } catch (error) {
    error.step = "traffic-lights:getInputsGenerator";
    outputError(error);
    throw error;
  }
}

async function fetchPage(cursor = null) {
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
      limit: "5",
    });

    if (cursor) {
      queryParams.append("next_token", cursor);
    }

    log(`Fetching from: ${URL}?${queryParams}`);

    const response = await fetch(`${URL}?${queryParams}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    return {
      data: JSON.stringify(responseData),
      cursor: responseData.next_token || null,
    };
  } catch (error) {
    error.step = "traffic-lights:fetchPage";
    outputError(error);
    throw error;
  }
}

export { getInputsGenerator };

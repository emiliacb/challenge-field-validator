import { imageSize } from "image-size";

import Task from "../../lib/interfaces/types/task.js";
import { outputError } from "../../cli/output.js";

/**
 * Fetches an image from a URL and returns its dimensions
 */
const getImageDimensions = async (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  const response = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await response.arrayBuffer());

  // Get image dimensions directly from buffer
  const dimensions = imageSize(imageBuffer);
  return {
    width: dimensions.width!,
    height: dimensions.height!,
  };
};

const validateAnnotations = async (task: Task) => {
  try {
    const { width: imageWidth, height: imageHeight } = await getImageDimensions(
      task.params.attachment
    );

    const validationResults = {
      isValid: true,
      dimensions: {
        width: imageWidth,
        height: imageHeight,
      },
      errors: [] as string[],
      warnings: [] as string[],
    };

    return validationResults;
  } catch (error) {
    error.step = "traffic-lights:validate-annotations";
    outputError(error);
    throw error;
  }
};

export { validateAnnotations };

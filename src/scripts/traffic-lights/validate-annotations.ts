import { imageSize } from "image-size";

import Task from "../../lib/types/task.js";
import { outputError } from "../../cli/output.js";
import { CONFIG } from "./config.js";
import { ValidationResults } from "../../core/validation-results.js";

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

    const validationResults = new ValidationResults();

    if (!task.response || !task.response.annotations) {
      validationResults.addError("No annotations found");
      return validationResults;
    }

    const annotations = task.response.annotations;

    for (const annotation of annotations) {
      const { label, width, height, top, left, attributes } = annotation;

      if (!CONFIG.validLabels.includes(label)) {
        validationResults.addError(`Invalid label: ${label}`);
      }

      if (width > imageWidth || height > imageHeight) {
        validationResults.addError(`Annotation is larger than the image`);
      }

      if (
        left < 0 ||
        top < 0 ||
        left + width > imageWidth ||
        top + height > imageHeight
      ) {
        validationResults.addError(
          `Annotation is outside the image boundaries`
        );
      }
    }

    return validationResults;
  } catch (error) {
    error.step = "traffic-lights:validate-annotations";
    outputError(error);
    throw error;
  }
};

export { validateAnnotations };

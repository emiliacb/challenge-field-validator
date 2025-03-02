import { imageSize } from "image-size";

import { RawTask } from "../../lib/types/task.js";
import { log } from "../../cli/output.js";
import { CONFIG } from "./config.js";
import { ValidationResults } from "../../core/validation/validation-results.js";
import { imageValidators } from "../../core/validation/image-validators.js";
import { sharedValidators } from "../../core/validation/shared-validators.js";

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

const validateAnnotations = async (task: RawTask) => {
  try {
    const imageUrl = task.params.attachment;
    const { width: imageWidth, height: imageHeight } = await getImageDimensions(
      imageUrl
    );

    const taskResults = new ValidationResults({ type: "task" });

    if (!task.response || !task.response.annotations) {
      taskResults.addError("No annotations found");
      return taskResults;
    }

    const annotations = task.response.annotations;

    for (const annotation of annotations) {
      const results = new ValidationResults({ type: "annotation" });

      sharedValidators.validateAnnotationLabel({
        results,
        annotation,
        reference: CONFIG.validLabels,
      });

      imageValidators.validateLabelImageSize({
        results,
        annotation,
      });

      imageValidators.validateLabelImageBounds({
        results,
        annotation,
        reference: {
          imageWidth,
          imageHeight,
        },
      });

      imageValidators.validateLabelImagePosition({
        results,
        annotation,
        reference: {
          imageWidth,
          imageHeight,
        },
      });

      // Add the annotation results into the task results
      taskResults.addPayload({
        image: {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
        },
        annotation,
        results,
      });
    }

    return taskResults;
  } catch (error) {
    error.step = "traffic-lights:validate-annotations";
    log.error(error);
    throw error;
  }
};

export { validateAnnotations };

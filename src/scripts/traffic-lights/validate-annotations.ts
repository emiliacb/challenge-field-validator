import { ValidationResults } from "../../core/validation/validation-results.js";
import { imageValidators } from "../../core/validation/image-validators.js";
import { sharedValidators } from "../../core/validation/shared-validators.js";
import { log } from "../../cli/output.js";
import { RawTask } from "../../lib/types/task.js";
import { getImageDimensions } from "../../lib/utils/get-image-dimensions.js";

const validateAnnotations = async (task: RawTask) => {
  try {
    const imageUrl = task.params.attachment;
    const { width: imageWidth, height: imageHeight } = await getImageDimensions(
      imageUrl
    );

    const taskResults = new ValidationResults({
      id: task.task_id,
      type: "task",
    });

    if (!task.response || !task.response.annotations) {
      taskResults.addError("No annotations found");
      return taskResults;
    }

    const annotations = task.response.annotations;

    for (const annotation of annotations) {
      const results = new ValidationResults({
        id: annotation.uuid,
        type: "annotation",
      });

      sharedValidators.validateObjectToAnnotate({
        results,
        annotation,
        reference: task.params.objects_to_annotate,
      });

      sharedValidators.validateOcclusion({
        results,
        annotation,
        reference: task.params.annotation_attributes.occlusion.choices,
      });

      sharedValidators.validateTruncation({
        results,
        annotation,
        reference: task.params.annotation_attributes.truncation.choices,
      });

      imageValidators.validateBackgroundColor({
        results,
        annotation,
        reference: task.params.annotation_attributes.background_color.choices,
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
        [annotation.uuid]: {
          image: {
            url: imageUrl,
            width: imageWidth,
            height: imageHeight,
          },
          annotation,
          results,
        },
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

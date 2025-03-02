import { ValidationResults } from "./validation-results.js";

type ImageValidationProps = {
  results: ValidationResults;
  annotation: any;
  reference?: any;
};

export const imageValidators = {
  validateLabelImageSize: ({ results, annotation }: ImageValidationProps) => {
    const { width, height } = annotation;

    if (width < 1 || height < 1) {
      results.addError(`Annotation is less than 1px in size`);
      return;
    }

    if (width < 10 || height < 10) {
      results.addWarning(`Annotation is less than 10px in size`);
      return;
    }
  },

  validateLabelImageBounds: ({
    results,
    annotation,
    reference,
  }: ImageValidationProps) => {
    const { width, height } = annotation;
    const { imageWidth, imageHeight } = reference;

    if (width > imageWidth || height > imageHeight) {
      results.addError(`Annotation is larger than the image`);
    }
  },

  validateLabelImagePosition: ({
    results,
    annotation,
    reference,
  }: ImageValidationProps) => {
    const { width, height, left, top } = annotation;
    const { imageWidth, imageHeight } = reference;

    if (
      left < 0 ||
      top < 0 ||
      left + width > imageWidth ||
      top + height > imageHeight
    ) {
      results.addError(`Annotation is outside the image boundaries`);
    }
  },

  validateBackgroundColor: ({
    results,
    annotation,
    reference,
  }: ImageValidationProps) => {
    const backgroundColorChoices =
      reference.params?.annotation_attributes?.background_color?.choices;
    if (
      backgroundColorChoices &&
      !backgroundColorChoices.includes(annotation.attributes?.background_color)
    ) {
      results.addError(
        `Invalid background color: ${
          annotation.attributes?.background_color
        }. Must be one of: ${backgroundColorChoices.join(", ")}`
      );
    }

    // Special validation for non_visible_face label
    if (
      annotation.label === "non_visible_face" &&
      annotation.attributes?.background_color !== "not_applicable"
    ) {
      results.addError(
        'Background color must be "not_applicable" for non_visible_face label'
      );
    }
  },
};

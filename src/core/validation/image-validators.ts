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
};

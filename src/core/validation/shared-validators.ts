import { ValidationResults } from "./validation-results.js";

type SharedValidationProps = {
  results: ValidationResults;
  annotation: any;
  reference: any;
};

export const sharedValidators = {
  validateAnnotationLabel: ({
    results,
    annotation,
    reference,
  }: SharedValidationProps) => {
    if (!reference.includes(annotation.label)) {
      results.addError(`Invalid label: ${annotation.label}`);
    }
  },

  validateObjectToAnnotate: ({
    results,
    annotation,
    reference,
  }: SharedValidationProps) => {
    const objectsToAnnotate = reference.params?.objects_to_annotate;
    if (objectsToAnnotate && !objectsToAnnotate.includes(annotation.label)) {
      results.addError(
        `Invalid label: ${
          annotation.label
        }. Must be one of: ${objectsToAnnotate.join(", ")}`
      );
    }
  },

  validateOcclusion: ({
    results,
    annotation,
    reference,
  }: SharedValidationProps) => {
    const occlusionChoices =
      reference.params?.annotation_attributes?.occlusion?.choices;
    if (
      occlusionChoices &&
      !occlusionChoices.includes(annotation.attributes?.occlusion)
    ) {
      results.addError(
        `Invalid occlusion value: ${
          annotation.attributes?.occlusion
        }. Must be one of: ${occlusionChoices.join(", ")}`
      );
    }
  },

  validateTruncation: ({
    results,
    annotation,
    reference,
  }: SharedValidationProps) => {
    const truncationChoices =
      reference.params?.annotation_attributes?.truncation?.choices;
    if (
      truncationChoices &&
      !truncationChoices.includes(annotation.attributes?.truncation)
    ) {
      results.addError(
        `Invalid truncation value: ${
          annotation.attributes?.truncation
        }. Must be one of: ${truncationChoices.join(", ")}`
      );
    }
  },

  validateBackgroundColor: ({
    results,
    annotation,
    reference,
  }: SharedValidationProps) => {
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

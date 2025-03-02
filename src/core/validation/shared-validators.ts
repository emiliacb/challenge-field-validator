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
};

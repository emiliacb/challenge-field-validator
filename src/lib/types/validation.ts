export type ValidationResultData = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  payload: Record<string, any>;
};

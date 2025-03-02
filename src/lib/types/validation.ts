export type ValidationResultData = {
  type: "task" | "annotation";
  isValid: boolean;
  errors: string[];
  warnings: string[];
  payload: Record<string, any>;
};

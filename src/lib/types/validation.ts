export type ValidationResultData = {
  id: string;
  type: "task" | "annotation";
  isValid: boolean;
  errors: string[];
  warnings: string[];
  payload: Record<string, any>;
};

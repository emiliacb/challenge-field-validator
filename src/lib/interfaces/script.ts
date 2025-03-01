export interface Script {
  name: string;
  description: string;
  getDefaultInput: () => Promise<string>;
  run: (input: string) => Promise<string>;
}

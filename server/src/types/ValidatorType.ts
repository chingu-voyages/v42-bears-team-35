export type Validator = {
  key: string;
  required: boolean;
  type: "string" | "email" | "password" | "uuid" | "float" | "integer";
  length?: number;
};

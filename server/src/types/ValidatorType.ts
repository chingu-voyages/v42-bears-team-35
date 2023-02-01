export type Validator = {
  key: string;
  required: boolean;
  type:
  | "string"
  | "email"
  | "password"
  | "uuid"
  | "float"
  | "integer"
  | "date"
  | "array";
  length?: number;
  minArrayLength?: number;
  maxArrayLength?: number;
  maxValue?: number;
  minValue?: number;
};

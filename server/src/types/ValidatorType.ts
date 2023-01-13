type ValidatorProperties = {
  required: boolean;
  type: "string" | "email" | "password";
  length?: number;
};

export type Validator = {
  name?: ValidatorProperties;
  phone?: ValidatorProperties;
  address?: ValidatorProperties;
  email?: ValidatorProperties;
  password?: ValidatorProperties;
};

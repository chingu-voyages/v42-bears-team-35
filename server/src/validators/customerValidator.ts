import { Validator } from "../types";

const customerCreateValidator: Validator = {
  name: {
    required: true,
    type: "string",
  },
  phone: {
    required: true,
    type: "string",
  },
  address: {
    required: true,
    type: "string",
  },
  email: {
    required: true,
    type: "email",
  },
  password: {
    required: true,
    type: "password",
  },
};

export default customerCreateValidator;

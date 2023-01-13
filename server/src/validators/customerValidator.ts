import { Validator } from "../types";

const customerCreateValidator: Validator[] = [
  {
    key: "name",
    required: true,
    type: "string",
  },
  {
    key: "phone",
    required: true,
    type: "string",
  },
  {
    key: "address",
    required: true,
    type: "string",
  },
  {
    key: "password",
    required: true,
    type: "password",
    length: 8,
  },
  {
    key: "email",
    required: true,
    type: "email",
  },
];

export default customerCreateValidator;

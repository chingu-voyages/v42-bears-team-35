import { Validator } from "../types";

const supplierCreateValidator: Validator[] = [
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
    key: "email",
    required: true,
    type: "email",
  },
];

export default supplierCreateValidator;

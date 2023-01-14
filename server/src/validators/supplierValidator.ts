import { Validator } from "../types";

export const supplierCreateValidator: Validator[] = [
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
export const supplierUpdateValidator: Validator[] = [
  {
    key: "name",
    required: false,
    type: "string",
  },
  {
    key: "phone",
    required: false,
    type: "string",
  },
  {
    key: "address",
    required: false,
    type: "string",
  },
  {
    key: "email",
    required: false,
    type: "email",
  },
];

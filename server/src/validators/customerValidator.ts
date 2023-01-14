import { Validator } from "../types";

export const customerCreateValidator: Validator[] = [
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

export const customerUpdateValidator: Validator[] = [
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
    key: "password",
    required: false,
    type: "password",
    length: 8,
  },
  {
    key: "email",
    required: false,
    type: "email",
  },
];

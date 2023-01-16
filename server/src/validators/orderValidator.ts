/* eslint-disable import/prefer-default-export */
import { Validator } from "../types";

export const orderCreateValidator: Validator[] = [
  {
    key: "date",
    type: "date",
    required: true,
  },
  {
    key: "email",
    type: "email",
    required: true,
  },
  {
    key: "traking",
    type: "string",
    required: false,
  },
];
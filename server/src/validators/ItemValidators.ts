import { Validator } from "../types";

export const itemCreateValidator: Validator[] = [
  {
    key: "description",
    required: true,
    type: "string",
  },
  {
    key: "price",
    required: true,
    type: "float",
  },
  {
    key: "length",
    required: true,
    type: "float",
  },
  {
    key: "width",
    required: true,
    type: "float",
  },
  {
    key: "height",
    required: true,
    type: "float",
  },
];

export const itemUpdateValidator: Validator[] = [
  {
    key: "description",
    required: true,
    type: "string",
  },
  {
    key: "price",
    required: true,
    type: "float",
  },
  {
    key: "length",
    required: true,
    type: "float",
  },
  {
    key: "width",
    required: true,
    type: "float",
  },
  {
    key: "height",
    required: true,
    type: "float",
  },
];

import { Validator } from "../types";

export const itemCreateValidator: Validator[] = [
  {
    key: "name",
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
  {
    key: "tags",
    required: true,
    type: "array",
    minArrayLength: 1,
  },
];

export const itemUpdateValidator: Validator[] = [
  {
    key: "description",
    required: false,
    type: "string",
  },
  {
    key: "price",
    required: false,
    type: "float",
  },
  {
    key: "length",
    required: false,
    type: "float",
  },
  {
    key: "width",
    required: false,
    type: "float",
  },
  {
    key: "height",
    required: false,
    type: "float",
  },
  {
    key: "tags",
    required: false,
    type: "array",
    minArrayLength: 1,
  },
];

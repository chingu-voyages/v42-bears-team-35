import { Validator } from "../types";

export const productCreateValidator: Validator[] = [
  {
    key: "imageUrl",
    required: true,
    type: "string",
  },
  {
    key: "tags",
    required: true,
    type: "array",
    minArrayLength: 2,
    maxArrayLength: 2,
  },
  {
    key: "description",
    required: true,
    type: "string",
    length: 5,
  },
  {
    key: "price",
    required: true,
    type: "float",
  },
  {
    key: "supplier",
    required: true,
    type: "uuid",
  },
  {
    key: "discount",
    required: false,
    type: "float",
  },
];

export const productRatingValidator: Validator[] = [
  {
    key: "rating",
    required: true,
    type: "integer",
    maxValue: 5,
    minValue: 1,
  },
];

export const productCommentValidator: Validator[] = [
  {
    key: "comment",
    required: true,
    type: "string",
  },
];

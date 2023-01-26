import { Validator } from "../types";

const commentCreateValidator: Validator[] = [
  {
    key: "comments",
    required: true,
    type: "string",
  },
  {
    key: "itemId",
    required: true,
    type: "string",
  },
  {
    key: "customerId",
    required: true,
    type: "string",
  },
];

export default commentCreateValidator;

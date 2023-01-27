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
    type: "uuid",
  },
  {
    key: "customerId",
    required: true,
    type: "uuid",
  },
];

export default commentCreateValidator;

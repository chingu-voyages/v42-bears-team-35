import { Validator } from "../types";

const orderItemValidator: Validator[] = [
  {
    key: "item",
    required: true,
    type: "uuid",
  },
  {
    key: "quantity",
    required: true,
    type: "float",
  },
];

export default orderItemValidator;

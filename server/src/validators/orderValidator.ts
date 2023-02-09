/* eslint-disable import/prefer-default-export */
import { Validator } from "../types";

export const orderCreateValidator: Validator[] = [
  {
    key: "email",
    type: "email",
    required: false,
  },
  {
    key: "name",
    type: "string",
    required: false,
  },
  {
    key: "phone",
    type: "string",
    required: false,
  },
  {
    key: "address",
    type: "string",
    required: false,
  },
  {
    key: "productID",
    type: "uuid",
    required: true,
  },
  {
    key: "quantity",
    type: "float",
    required: true,
  },
  {
    key: "cost",
    type: "float",
    required: true,
  },
  {
    key: "total",
    type: "float",
    required: true,
  },
];

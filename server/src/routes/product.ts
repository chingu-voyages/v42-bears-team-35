import { Router, Request, Response } from "express";
import validateData from "../middleware/dataValidation";
import { Validator } from "../types";

const router: Router = Router();

const productCreateValidator: Validator[] = [
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
    key: "dateAdded",
    required: true,
    type: "date",
  },
  {
    key: "discount",
    required: false,
    type: "float",
  },
];

router.post(
  "/",
  validateData(productCreateValidator),
  async (req: Request, res: Response) => res.sendStatus(204),
);

export default router;

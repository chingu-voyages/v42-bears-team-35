import { Request, Response, Router } from "express";
import {
  itemCreateValidator,
  itemUpdateValidator,
} from "../validators/ItemValidators";
import validateData from "../middleware/dataValidation";
import createItem from "../controller/item";

const router: Router = Router();

router.post(
  "/",
  validateData(itemCreateValidator),
  async (req: Request, res: Response) => {
    const data = await createItem(req.body);

    if ("errorCode" in data) {
      return res.status(data.errorCode).json(data);
    }
    return res.status(201).json(data);
  },
);
router.get("/", () => {});
router.get("/:uuid", () => {});
router.put("/:uuid", () => {});

export default router;

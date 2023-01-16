import { Request, Response, Router } from "express";
import {
  itemCreateValidator,
  itemUpdateValidator,
} from "../validators/ItemValidators";
import validateData from "../middleware/dataValidation";
import { createItem, getAllItems, getOneItem } from "../controller/item";
import { validateUUID } from "../middleware/validateUUID";

const router: Router = Router();

router.post(
  "/",
  validateData(itemCreateValidator),
  async (req: Request, res: Response) => {
    const data = await createItem(req.body);

    if ("errorCode" in data) return res.status(data.errorCode).json(data);

    return res.status(201).json(data);
  },
);
router.get("/", async (req: Request, res: Response) => {
  const data = await getAllItems();

  return res.status(200).json({ data });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const data = await getOneItem(req.params.uuid);

  if (data === null) {
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find item" });
  }
  return res.status(200).json({ data });
});

router.put("/:uuid", () => {});

export default router;

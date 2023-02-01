import { Request, Response, Router } from "express";
import validateData from "../middleware/dataValidation";
import {
  createItem,
  getAllItems,
  getOneItem,
  updateOneItem,
} from "../controller/item";
import { validateUUID } from "../middleware/validateUUID";
import { itemCreateValidator } from "../validators";
import { formatManyItems, formatOneItem } from "../formatting/formatItems";
import { Item } from "../model";

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
  const allData: Item[] = await getAllItems(req.query);
  const data = formatManyItems(allData);

  return res.status(200).json({ data });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const oneItem: Item | null = await getOneItem(req.params.uuid);

  if (oneItem === null) {
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find item" });
  }

  const data = formatOneItem(oneItem);

  return res.status(200).json({ data });
});

router.put("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const data = await getOneItem(req.params.uuid);

  if (data === null) {
    return res.status(404).json({
      errorKey: "uuid",
      errorDescription: "Unable to find item",
    });
  }

  const updatedItem = await updateOneItem(req.body, data);

  return res.status(200).json(updatedItem);
});

export default router;

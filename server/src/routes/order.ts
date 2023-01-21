import { Request, Response, Router } from "express";
import { validateUUID } from "../middleware/validateUUID";
import validateData from "../middleware/dataValidation";
import { orderCreateValidator } from "../validators";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} from "../controller/order";

const router: Router = Router();

router.post(
  "/",
  validateData(orderCreateValidator),
  async (req: Request, res: Response) => {
    const data = await createOrder(req.body);

    if ("errorCode" in data) return res.status(data.errorCode).json(data);

    return res.status(201).json(data);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllOrders();

  return res.status(200).json({ data });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const data = await getOneOrder(req.params.uuid);

  if (data === null)
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find order" });

  return res.status(200).json({ data });
});

router.put("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const data = await getOneOrder(req.params.uuid);

  if (data === null)
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find order" });

  const updatedOrder = await updateOneOrder(req.body, data);

  return res.status(200).json(updatedOrder);
});

export default router;

import { Request, Response, Router } from "express";
import validateData from "../middleware/dataValidation";
import { orderCreateValidator } from "../validators";
import { createOrder, getAllOrders } from "../controller/order";

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

export default router;

import { Request, Response, Router } from "express";
import { validateUUID } from "../middleware/validateUUID";
import validateData from "../middleware/dataValidation";
import { orderCreateValidator, orderItemValidator } from "../validators";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} from "../controller/order";
import validateOrderUUID from "../middleware/validateOrderUUID";
import { getOneItem } from "../controller/item";
import { createOrderItem, getAllOrderItems } from "../controller/orderItem";
import { Order } from "../model";
import { ErrorType, SuccessType } from "../types";
import { formatManyOrders, formatOneOrder } from "../formatting/formatOrders";

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
  const rawData = await getAllOrders();

  const data = formatManyOrders(rawData);

  return res.status(200).json({ data });
});

router.get("/:uuid", validateUUID, async (req: Request, res: Response) => {
  const rawData = await getOneOrder(req.params.uuid);

  if (rawData === null)
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find order" });

  const data = formatOneOrder(rawData);

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

router.post(
  "/:uuid/items",
  validateUUID,
  validateOrderUUID,
  validateData(orderItemValidator),
  async (req: Request, res: Response) => {
    const { item } = req.body;

    const itemObject = await getOneItem(item);
    const { order } = res.locals;

    if (!(order instanceof Order))
      return res
        .status(500)
        .json({ errorKey: "uuid", errorDescription: "invalid order" });

    if (!itemObject)
      return res.status(404).json({
        errorKey: "item",
        errorDescription: "Unable to find Item",
      });

    const orderItemResponse: SuccessType | ErrorType = await createOrderItem(
      itemObject,
      order,
      req.body.quantity,
    );

    if ("errorCode" in orderItemResponse)
      return res.status(orderItemResponse.errorCode).json({
        errorCode: orderItemResponse.errorCode,
        errorKey: orderItemResponse.errorKey,
        errorDescriptioin: orderItemResponse.errorDescription,
      });

    return res.status(201).json(orderItemResponse);
  },
);

router.get(
  "/:uuid/items",
  validateUUID,
  validateOrderUUID,
  async (req: Request, res: Response) => {
    const orderItems = await getAllOrderItems(res.locals.order);

    return res.status(200).json({ data: orderItems });
  },
);

export default router;

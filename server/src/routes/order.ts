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
import { deleteOrderItem, getAllOrderItems } from "../controller/orderItem";
import { Customer, Order } from "../model";
import { OrderCreate } from "../types";
import { formatManyOrders, formatOneOrder } from "../formatting/formatOrders";
import validateItemUUID from "../middleware/validateItemUUID";
import { optionalLogin } from "../middleware/authMiddleWare";
import { createNonRegisteredCustomer } from "../controller/customer";

const router: Router = Router();

router.post(
  "/",
  optionalLogin,
  validateData(orderCreateValidator),
  async (req: Request, res: Response) => {
    const { customer } = res.locals;
    const { productID, quantity, cost, total, name, email, phone, address } =
      req.body as OrderCreate;

    let selectedCustomer: Customer;

    if (customer === undefined) {
      // is a not logged in customer

      if (name === undefined)
        return res.status(400).json({
          errorKey: "name",
          errorDescription: "name is required",
          errorCode: 400,
        });

      if (email === undefined)
        return res.status(400).json({
          errorKey: "email",
          errorDescription: "email is required",
          errorCode: 400,
        });

      if (phone === undefined)
        return res.status(400).json({
          errorKey: "phone",
          errorDescription: "phone is required",
          errorCode: 400,
        });

      if (address === undefined)
        return res.status(400).json({
          errorKey: "address",
          errorDescription: "address is required",
          errorCode: 400,
        });

      const createdUser = await createNonRegisteredCustomer({
        name,
        phone,
        address,
        email,
      });

      if ("errorKey" in createdUser)
        return res.status(createdUser.errorCode).json(createdUser);

      selectedCustomer = createdUser;
    } else selectedCustomer = customer as Customer;

    const order = await createOrder(selectedCustomer, {
      productID,
      quantity,
      cost,
      total,
    });

    if ("errorCode" in order) return res.status(order.errorCode).json(order);

    return res.status(201).json(order);
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

    // const orderItemResponse: SuccessType | ErrorType = await createOrderItem(
    //   itemObject,
    //   order,
    //   req.body.quantity,
    // );

    // if ("errorCode" in orderItemResponse)
    //   return res.status(orderItemResponse.errorCode).json({
    //     errorCode: orderItemResponse.errorCode,
    //     errorKey: orderItemResponse.errorKey,
    //     errorDescriptioin: orderItemResponse.errorDescription,
    //   });

    // return res.status(201).json(orderItemResponse);
    return res.sendStatus(204);
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

router.delete(
  "/:uuid/items/:itemUuid",
  validateUUID,
  validateOrderUUID,
  validateItemUUID,
  async (req: Request, res: Response) => {
    const { order, item } = res.locals;

    const deleteResponse = await deleteOrderItem(item, order);

    if ("errorCode" in deleteResponse)
      return res.status(deleteResponse.errorCode).json(deleteResponse);

    return res.sendStatus(204);
  },
);

export default router;

import { Request, Response, Router } from "express";
import { orderStatusTypes } from "../types/OrderTypes";
import { validateUUID } from "../middleware/validateUUID";
import validateData from "../middleware/dataValidation";
import { orderCreateValidator } from "../validators";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} from "../controller/order";
import validateOrderUUID from "../middleware/validateOrderUUID";
import { deleteOrderItem, getAllOrderItems } from "../controller/orderItem";
import { Customer } from "../model";
import { OrderCreate, OrderUpdate } from "../types";
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

interface GetAllOrdersInterface {
  email?: string;
  status?: string;
}

router.get("/", optionalLogin, async (req: Request, res: Response) => {
  const { customer } = res.locals;
  const { email, status } = req.query as unknown as GetAllOrdersInterface;
  let customerEmail: string;

  if (customer !== undefined) customerEmail = (customer as Customer).email;
  else if (email !== undefined) customerEmail = email;
  else
    return res.status(401).json({
      errorCode: 401,
      errorDescription: "Unauthorized, you must be logged in",
      errorKey: "token",
    });

  const rawData = await getAllOrders(customerEmail, status);

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
    return res.status(404).json({
      errorKey: "uuid",
      errorDescription: "Unable to find order",
      errorStatus: 404,
    });

  if (data.status !== "open")
    return res.status(405).json({
      errorKey: "status",
      errorDescription: "Method not Allowed: Order is closed",
      errorStatus: 405,
    });

  if (
    req.body.status !== undefined &&
    !orderStatusTypes.includes(req.body.status.toLowerCase())
  )
    return res.status(400).json({
      errorKey: "status",
      errorDescription: "status can only be open, cancelled or approved",
      errorStatus: 400,
    });

  const updatedOrder = await updateOneOrder(req.body as OrderUpdate, data);

  return res.status(200).json(updatedOrder);
});

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

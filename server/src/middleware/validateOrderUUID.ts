/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { getOneOrder } from "../controller/order";

export default async function validateOrderUUID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const order = await getOneOrder(req.params.uuid);

  if (!order)
    return res
      .status(404)
      .json({ errorKey: "uuid", errorDescription: "Unable to find order" });

  res.locals.order = order;

  next();
}

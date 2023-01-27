/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from "express";
import { getOneItem } from "../controller/item";

export default async function validateItemUUID(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const item = getOneItem(req.params.itemUuid);

  if (!item)
    return res
      .status(404)
      .json({ errorKey: "itemUuid", errorDescription: "Unable to find item" });

  res.locals.item = item;

  next();
}

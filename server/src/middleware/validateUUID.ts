import { NextFunction, Request, Response } from "express";

export const isValidUUID = (uuid: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(uuid);
};

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const { uuid } = req.params;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { item_uuid } = req.params;

  if (uuid.toLowerCase() !== "me") {
    if (!isValidUUID(uuid))
      return res.status(400).json({
        errorKey: "uuid",
        errorDescription: "Uuid provided is invalid",
      });
  }

  if (item_uuid !== undefined && !isValidUUID(item_uuid))
    return res.status(400).json({
      errorKey: "uuid",
      errorDescription: "Uuid provided is invalid",
    });

  next();
};

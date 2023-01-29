/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { isEmailValid } from "./validateEmail";
import { Validator } from "../types";
import validateDate from "./validateDate";
import { isValidUUID } from "./validateUUID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateData(dataValidator: Validator[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (let i = 0; i < dataValidator.length; i += 1) {
      const toValidate = dataValidator[i];

      const { key, required, type } = toValidate;

      // If the key is required then check if it exists
      if (required && req.body[key] === undefined)
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} is required`,
        });

      if (
        type === "uuid" &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        !isValidUUID(req.body[key])
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} should be a valid uuid`,
        });

      if (
        type === "float" &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        Number.isNaN(parseFloat(req.body[key]))
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} should be a valid number`,
        });

      // If the key is email we will use the email validator
      if (
        type === "email" &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        !isEmailValid(req.body[key])
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} should be a valid email`,
        });

      if (
        toValidate.length !== undefined &&
        toValidate.length !== null &&
        req.body[key] !== undefined &&
        req.body[key].length < toValidate.length
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} is to short`,
        });

      if (
        type === "date" &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        !validateDate(req.body[key])
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} is not a valid date`,
          errorStatus: 400,
        });

      if (
        type === "array" &&
        toValidate.minArrayLength !== undefined &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key].length < toValidate.minArrayLength
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `at least ${toValidate.minArrayLength} ${key} are required`,
          errorStatus: 400,
        });

      if (
        type === "array" &&
        toValidate.maxArrayLength !== undefined &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key].length > toValidate.maxArrayLength
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `you should have no more than ${toValidate.maxArrayLength} ${key}`,
          errorStatus: 400,
        });
    }
    // if there is no error validation then go to the next function
    next();
  };
}

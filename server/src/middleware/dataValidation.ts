/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { isEmailValid } from "./validateEmail";
import { Validator } from "../types";

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
        req.body[key].length < toValidate.length
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} is to short`,
        });
    }

    // if there is no error validation then go to the next function
    next();
  };
}
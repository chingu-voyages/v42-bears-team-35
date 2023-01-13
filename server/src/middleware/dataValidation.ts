/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import { isEmailValid } from "./validateEmail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateData(dataValidator: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in dataValidator) {
      // Check if a required value is present
      if (dataValidator[key].required && req.body[key] === undefined)
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} is required`,
        });

      // If the key is email we will use the email validator
      if (
        dataValidator[key].type === "email" &&
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        !isEmailValid(req.body[key])
      )
        return res.status(400).json({
          errorKey: key,
          errorDescription: `${key} should be a valid email`,
        });
    }

    // if there is no error validation then go to the next function
    next();
  };
}

import { Secret, VerifyOptions, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ErrorType, TokenPayload } from "../types";
import { SECRET } from "../../environment";

const errorResponse: ErrorType = {
  errorCode: 403,
  errorKey: "Token",
  errorDescription: "Unable to validate token",
};

export function validateToken(token: string, secret: Secret): TokenPayload {
  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
  };

  try {
    const jwtPayload = <TokenPayload>verify(token, secret, verifyOptions);
    return jwtPayload;
  } catch (error: unknown) {
    throw new Error("Invalid credentials");
  }
}

// eslint-disable-next-line consistent-return
export function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!SECRET) return res.status(errorResponse.errorCode).json(errorResponse);

  const tokenToValidate = req.headers.authorization;

  if (!tokenToValidate)
    return res.status(errorResponse.errorCode).json(errorResponse);

  const tokenData = tokenToValidate.split(" ");
  if (tokenData[0].toLowerCase() !== "bearer" || tokenData.length < 2)
    return res.status(errorResponse.errorCode).json(errorResponse);

  try {
    res.locals.token = validateToken(tokenData[1], SECRET);
    next();
  } catch (error) {
    return res.status(errorResponse.errorCode).json(errorResponse);
  }
}

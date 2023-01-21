import jwt, { SignOptions } from "jsonwebtoken";
import { Customer } from "../model";
import { SECRET } from "../../environment";
import { Token, TokenPayload } from "../types";

export default function generateJwtToken(loggedInCustomer: Customer): Token {
  if (!SECRET) throw new Error("No secret to generate JWT token");

  const payload: TokenPayload = {
    id: loggedInCustomer.id,
    email: loggedInCustomer.email,
    name: loggedInCustomer.name,
  };

  const signOptions: SignOptions = {
    expiresIn: "2 days",
    algorithm: "RS256",
  };

  const token = jwt.sign(payload, SECRET, signOptions);

  return { type: "bearer", token };
}

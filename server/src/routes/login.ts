import { Request, Response, Router } from "express";
import { getCustomerByEmail } from "../controller/customer";
import { isEmailValid } from "../middleware/validateEmail";
import { validatePassword } from "../authentication";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!isEmailValid(email))
    return res.status(400).json({
      errorKey: "email",
      errorStatus: 400,
      errorDescription: "You must provide a valid email",
    });

  const customer = await getCustomerByEmail(email);

  if (!customer)
    return res.status(403).json({
      errorKey: "email",
      errorStatus: 403,
      errorDescription: "Invalid credentials",
    });

  // TODO generate the JWT token
  if (await validatePassword(password, customer.password))
    return res.status(200).json({ data: "Successfully logged in" });

  return res.status(403).json({
    errorKey: "email",
    errorStatus: 403,
    errorDescription: "Invalid credentials",
  });
});

export default router;

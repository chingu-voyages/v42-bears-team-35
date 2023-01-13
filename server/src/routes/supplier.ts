import { Request, Response, Router } from "express";
import { createSupplier } from "../controller/supplier";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const data = await createSupplier(req.body);

  if ("errorCode" in data) return res.status(data.errorCode).json(data);

  return res.status(201).json(data);
});

export default router;

import { Request, Response, Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getOneCustomer,
} from "../controller/customer";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const data = await createCustomer(req.body);

  if ("errorCode" in data) return res.status(data.errorCode).json(data);

  return res.status(201).json(data);
});

router.get("/", async (req: Request, res: Response) => {
  const data = await getAllCustomers();

  return res.status(200).json({ data });
});

router.get("/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;

  const data = await getOneCustomer(uuid);

  return res.status(200).json({ data });
});

export default router;

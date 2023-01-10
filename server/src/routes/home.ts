import { Router, Request, Response } from "express";
import AppDataSource from "../db";
import { Supplier } from "../model";

const supplierRepository = AppDataSource.getRepository(Supplier);

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const data = await supplierRepository.find();
  return res.status(200).json(data);
});

export default router;

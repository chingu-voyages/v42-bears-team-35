import { Router, Request, Response } from "express";
import AppDataSource from "../db";
import { Test } from "../model";

const testRepository = AppDataSource.getRepository(Test);

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const data = await testRepository.find();
  return res.status(200).json(data);
});

export default router;

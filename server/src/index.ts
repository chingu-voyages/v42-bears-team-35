import express, { Express, Request, Response } from "express";
import AppDataSource from "./db";
import { Test } from "./model";
import { PORT } from "../environment";

const app: Express = express();
const port = PORT;

const testRepository = AppDataSource.getRepository(Test);

app.get("/", async (req: Request, res: Response) => {
  const data = await testRepository.find();
  res.json(data);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

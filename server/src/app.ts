import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import AppDataSource from "./db";
import { Test } from "./model";
import swagger from "./swagger/swagger.json";

const app: Express = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

const testRepository = AppDataSource.getRepository(Test);

app.get("/", async (req: Request, res: Response) => {
  const data = await testRepository.find();
  return res.status(200).json(data);
});

export default app;

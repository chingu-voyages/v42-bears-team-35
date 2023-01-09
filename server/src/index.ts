import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import AppDataSource from "./db";
import { PORT } from "../environment";
import swagger from "./swagger/swagger.json";
import { Supplier } from "./model";

const app: Express = express();
const port = PORT;

const supplierRepository = AppDataSource.getRepository(Supplier);

app.get("/", async (req: Request, res: Response) => {
  const data = await supplierRepository.find();
  res.json(data);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

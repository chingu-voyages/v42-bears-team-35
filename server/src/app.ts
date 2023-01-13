import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swagger from "./swagger/swagger.json";
import router from "./routes";

const app: Express = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use(router);

export default app;

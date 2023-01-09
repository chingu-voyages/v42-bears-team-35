import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} from "../../environment";
import { Item, Supplier } from "../model";

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: [Supplier, Item],
});

AppDataSource.initialize();

export default AppDataSource;

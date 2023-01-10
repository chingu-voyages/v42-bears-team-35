import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./environment";

export default {
  name: "default",
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dropSchema: true,
};

import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;
const DB_PORT = Number(process.env.DB_PORT);

export { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT };

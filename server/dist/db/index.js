"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./../model");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        model_1.Test,
    ]
});
AppDataSource.initialize();

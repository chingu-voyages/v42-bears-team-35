import { QueryRunner, Repository } from "typeorm";
import {
  ErrorType,
  SuccessType,
  ItemCreate,
  // ItemResponse,
  // ItemUpdate,
} from "../types";
import AppDataSource from "../db";
import { Item } from "../model";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const itemRepository: Repository<Item> = AppDataSource.getRepository(Item);

export const createItem = (): Promise<ErrorType | SuccessType> => {};

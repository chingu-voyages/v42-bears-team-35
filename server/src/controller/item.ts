import { QueryRunner } from "typeorm";
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
// const itemRepository: Repository<Item> = AppDataSource.getRepository(Item);

const createItem = async (
  body: ItemCreate,
): Promise<ErrorType | SuccessType> => {
  try {
    await queryRunner.startTransaction();
    const item = new Item();

    item.description = body.description;
    item.length = body.length;
    item.height = body.height;
    item.width = body.width;
    item.price = body.price;

    await queryRunner.manager.save(item);

    await queryRunner.commitTransaction();

    return {
      data: {
        id: item.id,
        supplier: item.supplier ? item.supplier : null,
        description: item.description,
        price: item.price,
        length: item.length ? item.length : null,
        height: item.height,
        width: item.width,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();

    return {
      errorKey: "unknown",
      errorDescription: error.message,
      errorCode: 500,
    };
  }
};

export default createItem;

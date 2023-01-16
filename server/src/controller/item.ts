import { QueryRunner } from "typeorm";
import { ErrorType, SuccessType, ItemCreate, ItemUpdate } from "../types";
import AppDataSource from "../db";
import { Item } from "../model";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const itemRepository = AppDataSource.getRepository(Item);

export async function createItem(
  body: ItemCreate,
): Promise<ErrorType | SuccessType> {
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
}

export async function getAllItems(): Promise<Item[]> {
  const data: Item[] = await itemRepository
    .createQueryBuilder("item")
    .select("item.id")
    .addSelect("item.supplier")
    .addSelect("item.description")
    .addSelect("item.price")
    .addSelect("item.length")
    .addSelect("item.width")
    .addSelect("item.height")
    .getMany();

  return data;
}

export async function getOneItem(uuid: string): Promise<Item | null> {
  const data: Item | null = await itemRepository
    .createQueryBuilder("item")
    .select("item.id")
    .addSelect("item.description")
    .addSelect("item.supplier")
    .addSelect("item.price")
    .addSelect("item.length")
    .addSelect("item.width")
    .addSelect("item.height")
    .andWhere("item.id = :id")
    .setParameter("id", uuid)
    .getOne();

  return data;
}

export async function updateOneItem(
  body: ItemUpdate,
  item: Item,
): Promise<SuccessType | ErrorType> {
  const itemToUpdate = item;

  itemToUpdate.description = body.description;
  itemToUpdate.height = body.height;
  itemToUpdate.length = body.length;
  itemToUpdate.width = body.width;
  itemToUpdate.price = body.price;

  try {
    await queryRunner.startTransaction();

    await queryRunner.manager.save(itemToUpdate);
    await queryRunner.commitTransaction();
    return {
      data: {
        id: itemToUpdate.id,
        description: itemToUpdate.description,
        supplier: itemToUpdate.supplier,
        length: itemToUpdate.length,
        width: itemToUpdate.width,
        height: itemToUpdate.height,
        price: itemToUpdate.price,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: error.message,
    };
  }
}

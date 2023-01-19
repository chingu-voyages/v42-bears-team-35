import { QueryRunner } from "typeorm";
import { ErrorType, SuccessType, ItemCreate, ItemUpdate } from "../types";
import AppDataSource from "../db";
import { Item, ItemTag, Tag } from "../model";
import { insertTag } from "./tag";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const itemRepository = AppDataSource.getRepository(Item);

export async function createItem(
  body: ItemCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();
    const tagsArray: Tag[] = [];

    body.tags.forEach(async (tag: string) => {
      const newTag = await insertTag(tag);

      tagsArray.push(newTag);
    });

    const item = new Item();

    item.description = body.description;
    item.length = body.length;
    item.height = body.height;
    item.width = body.width;
    item.price = body.price;

    await queryRunner.manager.save(item);

    tagsArray.forEach(async (tag: Tag) => {
      const itemTag = new ItemTag();

      itemTag.item = item;
      itemTag.tag = tag;

      await queryRunner.manager.save(itemTag);
    });

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
        tags: tagsArray,
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
    .leftJoin("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .addSelect("tag.name")
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
    .addSelect("item.tag")
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
  // itemToUpdate.tag = body.tag;

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
        // tag: itemToUpdate.tag,
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

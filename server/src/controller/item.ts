import { QueryRunner, SelectQueryBuilder } from "typeorm";
import { getOneSupplier } from "./supplier";
import { ErrorType, SuccessType, ItemCreate, ItemUpdate } from "../types";
import AppDataSource from "../db";
import { Item, ItemTag, Tag, Picture, ItemPicture } from "../model";
import { insertTag } from "./tag";
import { insertPicture } from "./picture";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const itemRepository = AppDataSource.getRepository(Item);

export async function createItem(
  body: ItemCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();

    body.tags.forEach(async (tag: string) => {
      await insertTag(tag);
    });

    const tagsArray: Tag[] = [];

    for (let i = 0; i < body.tags.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const createdTag = await insertTag(body.tags[i]);
      tagsArray.push(createdTag);
    }

    body.pictures.forEach(async (picture: string) => {
      await insertPicture(picture);
    });

    const picturesArray: Picture[] = [];

    for (let i = 0; i < body.pictures.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const createdPicture = await insertPicture(body.pictures[i]);
      picturesArray.push(createdPicture);
    }

    const item = new Item();

    item.name = body.name;
    item.length = body.length;
    item.height = body.height;
    item.width = body.width;
    item.price = body.price;

    if (body.supplier) {
      const supplier = await getOneSupplier(body.supplier);

      if (supplier) item.supplier = supplier;
    }

    await queryRunner.manager.save(item);

    for (let i = 0; i < tagsArray.length; i += 1) {
      const itemTag = new ItemTag();
      itemTag.item = item;
      itemTag.tag = tagsArray[i];

      // eslint-disable-next-line no-await-in-loop
      await queryRunner.manager.save(itemTag);
    }

    for (let i = 0; i < picturesArray.length; i += 1) {
      const itemPicture = new ItemPicture();
      itemPicture.item = item;
      itemPicture.pictures = picturesArray[i];

      // eslint-disable-next-line no-await-in-loop
      await queryRunner.manager.save(itemPicture);
    }

    await queryRunner.commitTransaction();

    return {
      data: {
        id: item.id,
        name: item.name,
        price: item.price,
        length: item.length ? item.length : null,
        height: item.height,
        width: item.width,
        supplier: item.supplier ? item.supplier : null,
        tags: tagsArray,
        pictures: picturesArray,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    if (error.code === "23505") {
      return {
        errorKey: "name",
        errorDescription: error.detail,
        errorCode: 409,
      };
    }
    return {
      errorKey: "unknown",
      errorDescription: error.message,
      errorCode: 500,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllItems(queryParams: any): Promise<Item[]> {
  let data: SelectQueryBuilder<Item> = await itemRepository
    .createQueryBuilder("item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.picture", "pictures")
    .leftJoinAndSelect("item.itemPicture", "itemPicture");

  // { name: 'Name', tag: 'tag', seller: 'name'}
  const { name, tag, seller, page, limit, sort, direction } = queryParams;

  const pageToQuery: number = page ? parseInt(page, 10) : -1;
  const limitToQuery: number = limit ? parseInt(limit, 10) : -1;

  const sortToQuery: "name" | "price" =
    sort.toLowerCase() === "price" ? "price" : "name";

  const directionToQuery: "ASC" | "DESC" | undefined =
    direction.toUpperCase() === "DESC" ? "DESC" : "ASC";

  if (name !== undefined && name !== null)
    data = data
      .andWhere("item.name like :name")
      .setParameter("name", `%${name}%`);

  if (tag !== undefined && tag !== null)
    data = data.andWhere("tag.name = :tag").setParameter("tag", tag);

  if (seller !== undefined && seller !== null)
    data = data
      .andWhere("supplier.name = :supplier")
      .setParameter("supplier", seller);

  if (pageToQuery > 0 && limitToQuery > 0)
    data = data.limit(limitToQuery).skip(pageToQuery);

  data = data.addOrderBy(`item.${sortToQuery}`, directionToQuery);

  return data.getMany();
}

export async function getOneItem(uuid: string): Promise<Item | null> {
  const data: Item | null = await itemRepository
    .createQueryBuilder("item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
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

  itemToUpdate.name = body.name;
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
        name: itemToUpdate.name,
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

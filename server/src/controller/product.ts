import AppDataSource from "../db";
import { formatOneItem } from "../formatting/formatItems";
import {
  Customer,
  Item,
  ItemPicture,
  ItemTag,
  Picture,
  Rating,
  Supplier,
  Tag,
} from "../model";
import { ErrorType, SuccessType } from "../types";
import { insertPicture } from "./picture";
import { insertTag } from "./tag";

interface CreateProductType {
  imageUrl: string;
  tags: string[];
  description: string;
  price: number;
  discount?: number;
  imageArray?: string[];
}

const queryRunner = AppDataSource.createQueryRunner();
const itemRepository = AppDataSource.getRepository(Item);

export async function getOneProduct(uuid: string) {
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

export async function createNewProduct(
  body: CreateProductType,
  supplier: Supplier,
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
    const product = new Item();
    product.imageUrl = body.imageUrl;
    product.description = body.description;
    product.price = body.price;
    product.supplier = supplier;

    if (body.discount) product.discount = body.discount;

    await queryRunner.manager.save(product);

    for (let i = 0; i < tagsArray.length; i += 1) {
      const itemTag = new ItemTag();
      itemTag.item = product;
      itemTag.tag = tagsArray[i];

      // eslint-disable-next-line no-await-in-loop
      await queryRunner.manager.save(itemTag);
    }

    if (body.imageArray !== undefined) {
      body.imageArray.forEach(async (picture: string) => {
        await insertPicture(picture);
      });

      const picturesArray: Picture[] = [];

      for (let i = 0; i < body.imageArray.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const createdPicture = await insertPicture(body.imageArray[i]);
        picturesArray.push(createdPicture);
      }
      for (let i = 0; i < picturesArray.length; i += 1) {
        const itemPicture = new ItemPicture();
        itemPicture.item = product;
        itemPicture.pictures = picturesArray[i];

        // eslint-disable-next-line no-await-in-loop
        await queryRunner.manager.save(itemPicture);
      }
    }

    await queryRunner.commitTransaction();
    const createdProduct = await getOneProduct(product.id);

    if (createdProduct == null) throw new Error("unable to save product");
    const formatedProduct = formatOneItem(createdProduct);

    return {
      data: formatedProduct,
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

export async function getAllProducts() {
  const data: Item[] = await itemRepository
    .createQueryBuilder("item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
    .getMany();

  return data;
}

// eslint-disable-next-line consistent-return
export async function addRating(
  product: Item,
  customer: Customer,
  rating: number,
): Promise<ErrorType | SuccessType> {
  const productToSave = product;
  try {
    await queryRunner.startTransaction();

    switch (rating) {
      case 1:
        productToSave.oneStar += 1;
        break;
      case 2:
        productToSave.twoStar += 1;
        break;
      case 3:
        productToSave.threeStar += 1;
        break;
      case 4:
        productToSave.fourStar += 1;
        break;
      case 5:
        productToSave.fiveStar += 1;
        break;
      default:
        throw new Error("Rating should be between 1 and 5");
    }

    const totalRatings =
      productToSave.oneStar +
      productToSave.twoStar +
      productToSave.threeStar +
      productToSave.fourStar +
      productToSave.fiveStar;

    const totalStars =
      productToSave.oneStar * 1 +
      productToSave.twoStar * 2 +
      productToSave.threeStar * 3 +
      productToSave.fourStar * 4 +
      productToSave.fiveStar * 5;

    productToSave.productRating = totalStars / totalRatings;

    await queryRunner.manager.save(productToSave);

    const customerRating = new Rating();
    customerRating.customer = customer;
    customerRating.item = productToSave;
    customerRating.score = rating;

    await queryRunner.manager.save(customerRating);

    await queryRunner.commitTransaction();

    return { data: productToSave };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await queryRunner.rollbackTransaction();
    if (err.code === "23505") {
      return {
        errorKey: "email",
        errorDescription: err.detail,
        errorCode: 409,
      };
    }

    return {
      errorKey: "unknown",
      errorCode: 500,
      errorDescription: err.message,
    };
  }
}

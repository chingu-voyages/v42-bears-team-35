/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryFailedError } from "typeorm";
import { DatabaseError } from "pg-protocol";
import AppDataSource from "../db";
import { Item, Order, OrderItem } from "../model";
import { ErrorType, SuccessType } from "../types";

const queryRunner = AppDataSource.createQueryRunner();
const orderItemRepository = AppDataSource.getRepository(OrderItem);

export async function createOrderItem(
  item: Item,
  order: Order,
  quantity: number,
  cost: number,
  total: number,
): Promise<SuccessType | ErrorType> {
  const orderToUpdate = order;
  try {
    await queryRunner.startTransaction();

    const orderItem = new OrderItem();

    orderItem.item = item;
    orderItem.order = order;
    orderItem.quantity = quantity;
    orderItem.cost = cost;
    orderItem.total = total;

    await queryRunner.manager.save(orderItem);

    orderToUpdate.total += orderItem.total;

    await queryRunner.manager.save(orderToUpdate);

    await queryRunner.commitTransaction();

    return { data: orderItem };
  } catch (err: unknown) {
    await queryRunner.rollbackTransaction();

    if (err instanceof QueryFailedError) {
      const error = err.driverError as DatabaseError;
      if (error.code === "23505")
        return {
          errorCode: 409,
          errorKey: "item",
          errorDescription: "Item already exists for that order",
        };
    }

    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: err as string,
    };
  }
}

export async function getAllOrderItems(order: Order): Promise<OrderItem[]> {
  const allOrderItems = await orderItemRepository
    .createQueryBuilder("orderitem")
    .leftJoinAndSelect("orderitem.item", "item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
    .andWhere("orderitem.order = :orderUuid")
    .setParameter("orderUuid", order.id)
    .getMany();

  return allOrderItems;
}

async function getOneOrderItemById(
  orderId: string,
  itemId: string,
): Promise<OrderItem | null> {
  const oneOrderItem = await orderItemRepository
    .createQueryBuilder("orderitem")
    .leftJoinAndSelect("orderitem.item", "item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
    .andWhere("orderitem.order = :orderUuid")
    .andWhere("orderitem.item = :itemUuid")
    .setParameter("orderUuid", orderId)
    .setParameter("itemUuid", itemId)
    .getOne();

  return oneOrderItem;
}

export async function updateOrderItem(): Promise<null> {
  return null;
}

export async function deleteOrderItem(
  item: Item,
  order: Order,
): Promise<ErrorType | SuccessType> {
  const orderToUpdate = order;
  const orderItem = await getOneOrderItemById(orderToUpdate.id, item.id);

  if (orderItem === null)
    return {
      errorKey: "item",
      errorCode: 404,
      errorDescription: `Item not found in that order`,
    };

  const { total } = orderItem;

  try {
    await queryRunner.startTransaction();

    await queryRunner.manager.delete(OrderItem, orderItem.id);

    orderToUpdate.total -= total;

    await queryRunner.manager.save(orderToUpdate);

    await queryRunner.commitTransaction();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();

    return {
      errorCode: 500,
      errorDescription: error.message,
      errorKey: "item",
    };
  }

  return {
    data: "Item successfully deleted",
  };
}

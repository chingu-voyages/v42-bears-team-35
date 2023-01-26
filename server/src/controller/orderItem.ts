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
): Promise<SuccessType | ErrorType> {
  const orderToUpdate = order;
  try {
    await queryRunner.startTransaction();

    const orderItem = new OrderItem();

    orderItem.item = item;
    orderItem.order = order;
    orderItem.quantity = quantity;
    orderItem.cost = item.price;
    orderItem.total = quantity * item.price;

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
  const allOrderItems = orderItemRepository
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

export async function updateOrderItem(): Promise<void> {}

export async function deleteOrderItem(): Promise<void> {}

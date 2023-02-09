import { QueryRunner } from "typeorm";
import { Customer, Order } from "../model";
import { ErrorType, OrderUpdate, SuccessType } from "../types";
import AppDataSource from "../db";
import { getOneProduct } from "./product";
import { createOrderItem } from "./orderItem";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const orderRepository = AppDataSource.getRepository(Order);

interface CreateOrderItemInterface {
  productID: string;
  quantity: number;
  cost: number;
  total: number;
}

export async function getOpenOrderByCustomer(customer: Customer) {
  const data = await orderRepository
    .createQueryBuilder("order")
    .andWhere("order.customer = :customer")
    .andWhere("order.status = :status")
    .setParameter("customer", customer.id)
    .setParameter("status", "open")
    .getOne();
  return data;
}

export async function createOrder(
  customer: Customer,
  orderItem: CreateOrderItemInterface,
): Promise<ErrorType | SuccessType> {
  const product = await getOneProduct(orderItem.productID);
  if (product === null)
    return {
      errorCode: 404,
      errorKey: "productID",
      errorDescription: "Unable to find the product",
    };

  try {
    await queryRunner.startTransaction();

    let order: Order | null = await getOpenOrderByCustomer(customer);

    if (order === null) {
      order = new Order();
      order.customer = customer;
      await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      await queryRunner.startTransaction();
    }

    const createdOrderItem = await createOrderItem(
      product,
      order,
      orderItem.quantity,
      orderItem.cost,
      orderItem.total,
    );

    if ("errorCode" in createdOrderItem) {
      await queryRunner.rollbackTransaction();
      return {
        errorCode: createdOrderItem.errorCode,
        errorKey: createdOrderItem.errorKey,
        errorDescription: createdOrderItem.errorDescription,
      };
    }

    await queryRunner.commitTransaction();

    return { data: order };
  } catch (error) {
    await queryRunner.rollbackTransaction();

    console.error(error);

    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: "Unknown error, check your logs",
    };
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const data: Order[] = await orderRepository
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.orderItems", "orderItems")
    .leftJoinAndSelect("orderItems.item", "item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
    .getMany();

  return data;
}

export async function getOneOrder(uuid: string): Promise<Order | null> {
  const data: Order | null = await orderRepository
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.orderItems", "orderItems")
    .leftJoinAndSelect("orderItems.item", "item")
    .leftJoinAndSelect("item.itemTag", "itemTag")
    .leftJoinAndSelect("itemTag.tag", "tag")
    .leftJoinAndSelect("item.supplier", "supplier")
    .leftJoinAndSelect("item.itemPicture", "itemPicture")
    .leftJoinAndSelect("itemPicture.pictures", "pictures")
    .andWhere("order.id = :id")
    .setParameter("id", uuid)
    .getOne();

  return data;
}

export async function updateOneOrder(
  body: OrderUpdate,
  order: Order,
): Promise<SuccessType | ErrorType> {
  const orderToUpdate = order;
  orderToUpdate.tracking_number = body.tracking
    ? body.tracking
    : orderToUpdate.tracking_number;

  try {
    await queryRunner.startTransaction();

    await queryRunner.manager.save(orderToUpdate);

    await queryRunner.commitTransaction();
    return {
      data: {
        id: orderToUpdate.id,
        customer: orderToUpdate.customer,
        total: orderToUpdate.total,
        tracking: orderToUpdate.tracking_number,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      errorCode: 500,
      errorKey: "unknown",
      errorDescription: error.message,
    };
  }
}

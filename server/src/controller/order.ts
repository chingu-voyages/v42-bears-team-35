import { QueryRunner } from "typeorm";
import { Order } from "../model";
import { ErrorType, OrderCreate, OrderUpdate, SuccessType } from "../types";
import AppDataSource from "../db";

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
const orderRepository = AppDataSource.getRepository(Order);

export async function createOrder(
  body: OrderCreate,
): Promise<ErrorType | SuccessType> {
  try {
    await queryRunner.startTransaction();
    const order = new Order();

    order.email = body.email;
    order.date = new Date(body.date);

    await queryRunner.manager.save(order);

    await queryRunner.commitTransaction();

    return {
      data: {
        id: order.id,
        email: order.email,
        date: order.date,
        customer: order.customer ? order.customer : null,
        total: order.total,
        tracking: order.tracking_number,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      errorCode: 500,
      errorDescription: error.message,
      errorKey: "unknown",
    };
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const data: Order[] = await orderRepository
    .createQueryBuilder("order")
    .select("order.id")
    .addSelect("order.customer")
    .addSelect("order.email")
    .addSelect("order.date")
    .addSelect("order.total")
    .addSelect("order.tracking_number")
    .getMany();

  return data;
}

export async function getOneOrder(uuid: string): Promise<Order | null> {
  const data: Order | null = await orderRepository
    .createQueryBuilder("order")
    .select("order.id")
    .addSelect("order.customer")
    .addSelect("order.email")
    .addSelect("order.date")
    .addSelect("order.total")
    .addSelect("order.tracking_number")
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

  orderToUpdate.email = body.email ? body.email : order.email;
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
        email: orderToUpdate.email,
        date: orderToUpdate.date,
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

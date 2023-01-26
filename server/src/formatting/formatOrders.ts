import { FormattedItemResponse } from "../types";
import { Order, OrderItem } from "../model";
import { formatOneItem } from "./formatItems";

export interface OrderResponseInterface {
  id: string;
  date: Date;
  email: string;
  total: number;
  items: OrderItemResponseInterface[];
}

export interface OrderItemResponseInterface {
  quantity: number;
  cost: number;
  total: number;
  item: FormattedItemResponse;
}

export function formatOneOrder(order: Order): OrderResponseInterface {
  const orderItemsResponse = order.orderItems.map((orderItem: OrderItem) => {
    return {
      item: formatOneItem(orderItem.item),
      quantity: orderItem.quantity,
      cost: orderItem.cost,
      total: orderItem.total,
    };
  });

  return {
    id: order.id,
    date: order.date,
    email: order.email,
    total: order.total,
    items: orderItemsResponse,
  };
}

export function formatManyOrders(orders: Order[]): OrderResponseInterface[] {
  const formatedOrderResponse = orders.map((order: Order) =>
    formatOneOrder(order),
  );

  return formatedOrderResponse;
}

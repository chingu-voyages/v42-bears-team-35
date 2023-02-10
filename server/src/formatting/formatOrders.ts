import { FormattedItemResponse } from "../types/ItemTypes";
import { Order, OrderItem } from "../model";
import { formatOneItem } from "./formatItems";

export interface OrderResponseInterface {
  id: string;
  total: number;
  status: string;
  date: Date;
  orderItem: OrderItemResponseInterface[];
}

export interface OrderItemResponseInterface {
  quantity: number;
  cost: number;
  total: number;
  product: FormattedItemResponse;
}

export function formatOneOrder(order: Order): OrderResponseInterface {
  const orderItemsResponse = order.orderItems.map((orderItem: OrderItem) => {
    return {
      quantity: orderItem.quantity,
      cost: orderItem.cost,
      total: orderItem.total,
      product: formatOneItem(orderItem.item),
    };
  });

  return {
    id: order.id,
    total: order.total,
    status: order.status,
    date: order.created_at,
    orderItem: orderItemsResponse,
  };
}

export function formatManyOrders(orders: Order[]): OrderResponseInterface[] {
  const formatedOrderResponse = orders.map((order: Order) =>
    formatOneOrder(order),
  );

  return formatedOrderResponse;
}

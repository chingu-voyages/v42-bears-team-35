export interface OrderCreate {
  customer?: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  productID: string;
  quantity: number;
  cost: number;
  total: number;
}

export type OrderStatus = "open" | "cancelled" | "approved";

export interface OrderUpdate {
  tracking?: string;
  status?: OrderStatus;
}

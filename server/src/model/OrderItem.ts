/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Item, Order } from ".";

@Entity()
export default class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "float",
    nullable: false,
  })
  quantity: number;

  @Column({
    type: "float",
    nullable: false,
  })
  cost: number;

  @Column({
    type: "float",
    nullable: false,
  })
  total: number;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  order: Relation<Order>;

  @ManyToOne(() => Item, (item: Item) => item.orderItems)
  item: Relation<Item>;
}

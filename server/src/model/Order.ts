/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { OrderItem, Customer } from ".";

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "float",
    nullable: false,
    default: 0,
  })
  total: number;

  @Column({
    nullable: false,
    default: "open",
  })
  status: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @Column({
    nullable: true,
  })
  tracking_number: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.orders)
  customer: Relation<Customer>;

  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order)
  orderItems: OrderItem[];
}

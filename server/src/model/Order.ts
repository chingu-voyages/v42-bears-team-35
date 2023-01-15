/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import Customer from "./Customers";

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    type: "date",
    nullable: false,
  })
  date: Date;

  @Column({
    type: "float",
    nullable: false,
    default: 0,
  })
  total: number;

  @ManyToOne(() => Customer, (customer: Customer) => customer.orders)
  customer: Relation<Customer>;
}

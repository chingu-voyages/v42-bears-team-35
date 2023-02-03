import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Item, Customer } from ".";

@Entity()
@Unique(["item", "customer"])
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  comment: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @ManyToOne(() => Item, (item) => item.comments)
  item: Relation<Item>;

  @ManyToOne(() => Customer, (customer) => customer.comment)
  customer: Relation<Customer>;
}

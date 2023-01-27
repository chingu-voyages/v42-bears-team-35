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
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  comments: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @Unique(["Item"])
  @ManyToOne(() => Item, (item) => item.comments)
  item: Relation<Item>;

  @Unique(["Customer"])
  @ManyToOne(() => Customer, (customer) => customer.comments)
  customer: Relation<Customer>;
}

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
@Unique(["comments"])
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

  @ManyToOne(() => Item, (item) => item.comments)
  item: Relation<Item>;

  @ManyToOne(() => Customer, (customer) => customer.comments)
  customer: Relation<Customer>;
}

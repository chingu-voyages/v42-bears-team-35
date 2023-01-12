import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
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
  comment: string;

  @ManyToOne(() => Item, (item) => item.comments)
  item: Relation<Item>;

  @ManyToOne(() => Customer, (customer) => customer.comment)
  customer: Relation<Comment>;
}

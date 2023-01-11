import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
  @OneToMany(() => Item, (item) => item.comments)
  comments: Comment[];

  items: [];

  @ManyToOne(() => Customer, (customer) => customer.comment)
  customer: Relation<Comment>;
}

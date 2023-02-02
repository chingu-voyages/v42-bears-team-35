import {
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
  Relation,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Customer, Item } from ".";

@Entity()
@Unique(["customer", "item"])
export default class Ratings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  score: number;

  @ManyToOne(() => Customer, (customer) => customer.rating)
  customer: Relation<Customer>;

  @ManyToOne(() => Item, (item) => item.ratings)
  item: Relation<Item>;
}

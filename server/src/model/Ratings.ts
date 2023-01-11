import {
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
  Relation,
  PrimaryGeneratedColumn,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Customer, Item } from ".";

@Entity()
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

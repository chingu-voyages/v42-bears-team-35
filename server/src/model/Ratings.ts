import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  BaseEntity,
  Relation,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Customers } from "./index";

@Entity()
export default class Ratings extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column({
    nullable: false,
  })
  score: number;

  @ManyToOne(() => Customers, (customer) => customer.rating)
  customer: Relation<Customers>;
}

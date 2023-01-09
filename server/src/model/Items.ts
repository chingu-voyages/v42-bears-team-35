import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import Supplier from "./Supplier";

@Entity()
@Unique(["supplier", "description"])
export default class Item extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  uuid: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    type: "float",
    nullable: false,
  })
  price: number;

  @Column({
    type: "float",
    nullable: true,
  })
  height: number;

  @Column({
    type: "float",
    nullable: false,
  })
  width: number;

  @Column({
    type: "float",
    nullable: false,
  })
  length: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.items)
  supplier: Relation<Supplier>;
}

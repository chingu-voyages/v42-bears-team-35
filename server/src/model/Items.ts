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
// eslint-disable-next-line import/no-cycle
import Comments from "./Comments";

@Entity()
@Unique(["supplier", "description"])
export default class Item extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

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

  @ManyToOne(() => Comments, (comment) => comment.items)
  comments: Relation<Comments>;
}

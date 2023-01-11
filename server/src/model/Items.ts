import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Supplier, Comment, Rating } from ".";

@Entity()
@Unique(["supplier", "description"])
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
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

  @ManyToOne(() => Comment, (comment) => comment.items)
  comments: Relation<Comment>;

  @OneToMany(() => Rating, (rating) => rating.item)
  ratings: Rating[];
}

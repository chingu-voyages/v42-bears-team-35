import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Supplier, Comment, Rating, OrderItem, ItemTag, ItemPicture } from ".";

@Entity()
@Unique(["supplier", "name"])
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

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

  // @Column({
  //   nullable: false,
  // })
  // tag: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.items)
  supplier: Relation<Supplier>;

  @OneToMany(() => Comment, (comment: Comment) => comment.item)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.item)
  ratings: Rating[];

  @OneToOne(() => OrderItem, (orderItem: OrderItem) => orderItem.item)
  orderItems: OrderItem[];

  @OneToMany(() => ItemTag, (itemTag: ItemTag) => itemTag.item)
  itemTag: ItemTag[];

  @OneToMany(() => ItemPicture, (itemPicture: ItemPicture) => itemPicture.item)
  itemPicture: ItemPicture[];
}

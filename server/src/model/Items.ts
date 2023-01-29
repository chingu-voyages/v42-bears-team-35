import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Supplier, Comment, Rating, OrderItem, ItemTag, ItemPicture } from ".";

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: "float",
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  imageUrl: string;

  @Column({
    type: "float",
    nullable: false,
    default: 0,
  })
  discount: number;

  @Column({
    type: "float",
    nullable: false,
    default: 0,
  })
  productRating: number;

  @Column({
    type: "integer",
    nullable: false,
    default: 0,
  })
  oneStar: number;

  @Column({
    type: "integer",
    nullable: false,
    default: 0,
  })
  twoStar: number;

  @Column({
    type: "integer",
    nullable: false,
    default: 0,
  })
  threeStar: number;

  @Column({
    type: "integer",
    nullable: false,
    default: 0,
  })
  fourStar: number;

  @Column({
    type: "integer",
    nullable: false,
    default: 0,
  })
  fiveStar: number;

  @CreateDateColumn({
    type: "timestamptz",
    nullable: false,
  })
  created_at: Date;

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

  @OneToMany(() => ItemPicture, (itemPicture) => itemPicture.item)
  itemPicture: ItemPicture[];
}

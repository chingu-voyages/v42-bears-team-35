import {
  Entity,
  Unique,
  CreateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Comment, Item, Rating, Order } from ".";

@Entity()
@Unique(["name"])
@Unique(["email"])
export default class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true
  })
  city: string;

  @Column({
    nullable: true
  })
  state: string;

  @Column({
    nullable: true
  })
  zip: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: false,
    type: "boolean",
    default: true,
  })
  is_registered: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @OneToMany(() => Rating, (rating) => rating.customer)
  rating: Rating[];

  @OneToMany(() => Comment, (comment) => comment.customer)
  comment: Comment[];

  @ManyToMany(() => Item)
  @JoinTable({
    name: "favorite",
    joinColumn: {
      name: "customer",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "item",
      referencedColumnName: "id",
    },
  })
  items: Item[];

  @OneToMany(() => Order, (order: Order) => order.customer)
  orders: Order[];
}

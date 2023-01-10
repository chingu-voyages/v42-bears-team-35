import {
  Entity,
  Unique,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Ratings } from "./index";

@Entity()
@Unique(["name"])
@Unique(["email"])
export default class Customers extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
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
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @OneToMany(() => Ratings, (rating) => rating.customer)
  rating: Ratings[];
}

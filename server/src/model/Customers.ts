import {
  Entity,
  Unique,
  CreateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Comment, Rating } from ".";

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

  @OneToMany(() => Rating, (rating) => rating.customer)
  rating: Rating[];

  @OneToMany(() => Comment, (comment) => comment.customer)
  comment: Comment[];
}

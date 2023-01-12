import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Item } from ".";

@Entity()
@Unique(["email"])
@Unique(["name"])
export default class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: false,
  })
  email: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @OneToMany(() => Item, (item) => item.supplier)
  items: Item[];
}

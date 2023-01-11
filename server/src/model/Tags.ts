import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import { Item } from ".";

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];
}

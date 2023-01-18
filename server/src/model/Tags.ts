import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { ItemTag } from ".";

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => ItemTag, (itemTag: ItemTag) => itemTag.tags)
  itemTag: ItemTag[];
}

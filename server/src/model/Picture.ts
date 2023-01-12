/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PictureMetadata from "./PictureMetadata";
import { Item } from ".";

@Entity()
export default class Picture extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @OneToOne(() => PictureMetadata, (metadata) => metadata.picture)
  metadata: PictureMetadata;

  @ManyToMany(() => Item)
  @JoinTable({
    name: "picture_item", // table name for the junction table of this relation
    joinColumn: {
      name: "picture",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "item",
      referencedColumnName: "id",
    },
  })
  items: Item[];
}

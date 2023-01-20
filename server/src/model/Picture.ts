/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PictureMetadata from "./PictureMetadata";
import { Item, ItemPicture } from ".";

@Entity()
export default class Picture extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @OneToOne(() => PictureMetadata, (metadata) => metadata.picture)
  metadata: PictureMetadata;

  @OneToMany(() => ItemPicture, (itemPicture: ItemPicture) => itemPicture.item)
  itemPicture: ItemPicture[];

  items: Item[];
}

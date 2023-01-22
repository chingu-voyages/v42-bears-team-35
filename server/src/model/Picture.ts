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
import { ItemPicture } from ".";

@Entity()
export default class Picture extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  url: string;

  @OneToOne(() => PictureMetadata, (metadata) => metadata.pictures)
  metadata: PictureMetadata[];

  @OneToMany(() => ItemPicture, (itemPicture) => itemPicture.pictures)
  itemPicture: ItemPicture[];
}

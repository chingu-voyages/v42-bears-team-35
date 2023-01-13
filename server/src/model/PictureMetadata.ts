/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Picture from "./Picture";

@Entity()
export default class PictureMetadata extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Picture, (picture) => picture.metadata)
  @JoinColumn()
  picture: Picture;

  @Column()
  name: string;

  @Column({
    type: "int",
  })
  height: number;

  @Column({
    type: "int",
  })
  width: number;
}

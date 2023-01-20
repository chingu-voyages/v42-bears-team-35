import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Item, Picture } from ".";

@Entity()
export default class ItemPicture extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Picture, (picture: Picture) => picture.itemPicture)
  picture: Relation<Picture>;

  @ManyToOne(() => Item, (item: Item) => item.itemPicture)
  item: Relation<Item>;
}

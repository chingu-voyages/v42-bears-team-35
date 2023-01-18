import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Item, Tag } from ".";

@Entity()
export default class ItemTag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  tagsId: string;

  @ManyToOne(() => Tag, (tag: Tag) => tag.itemTag)
  tags: Relation<Tag>;

  @PrimaryGeneratedColumn("uuid")
  itemsId: string;

  @ManyToOne(() => Item, (item: Item) => item.itemTag)
  items: Relation<Item>;
}

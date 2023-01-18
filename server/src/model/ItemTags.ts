import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import { Item, Tag } from ".";

@Entity()
export default class ItemTag extends BaseEntity {
  @PrimaryColumn("uuid")
  tagsId: string;

  @ManyToOne(() => Tag, (tag: Tag) => tag.itemTag)
  tags: Relation<Tag>;

  @PrimaryColumn("uuid")
  itemsId: string;

  @ManyToOne(() => Item, (item: Item) => item.itemTag)
  items: Relation<Item>;
}

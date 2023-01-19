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
  id: string;

  @ManyToOne(() => Tag, (tag: Tag) => tag.itemTag)
  tag: Relation<Tag>;

  @ManyToOne(() => Item, (item: Item) => item.itemTag)
  item: Relation<Item>;
}

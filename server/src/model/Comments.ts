import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
// eslint-disable-next-line import/no-cycle
import Items from "./Items";

@Entity()
export default class Comments extends BaseEntity {
  @PrimaryColumn({
    type: "uuid",
  })
  id: string;

  @Column({
    nullable: false,
  })
  comment: string;

  // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
  @OneToMany(() => Items, (item) => item.comments)
  comments: Comments;

  items: [];
}

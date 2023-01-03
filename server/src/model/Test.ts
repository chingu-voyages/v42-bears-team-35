import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Test {
  @PrimaryColumn({
    type: "uuid",
  })
  uuid: string;
}

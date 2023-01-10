import { Entity, ManyToOne, Column, PrimaryColumn, BaseEntity } from "typeorm";
import  Customers  from "./Customers";

@Entity()
export default class Ratings extends BaseEntity {
	@PrimaryColumn({
		type: "uuid",
	})
	id: string;

	@Column({
		nullable: false,
	})
	score: number;

	@ManyToOne(() => Customers, (customer) => customer.rating)
	customer: Customers;
}

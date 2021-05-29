import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Email, FullName, Overview, PhoneNumber, UserId } from "./value-objects";

@Entity()
export class Profile {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column(() => UserId, { prefix: "user_id" })
	userId: UserId;

	@Column(() => FullName, { prefix: "full_name" })
	fullName: FullName;

	@Column(() => PhoneNumber, { prefix: "phone_number" })
	phoneNumber: PhoneNumber;

	@Column(() => Email, { prefix: "email" })
	email: FullName;

	@Column(() => Overview, { prefix: "overview" })
	overview: Overview;
}

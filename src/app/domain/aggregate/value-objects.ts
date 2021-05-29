import { Column } from "typeorm";

export class UserId {
	@Column()
	value: string;
}

export class FullName {
	@Column()
	value: string;
}

export class PhoneNumber {
	@Column()
	value: string;
}

export class Email {
	@Column()
	value: string;
}

export class Overview {
	@Column()
	value: string;
}

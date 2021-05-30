import { Column } from "typeorm";

export class UserId {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class FullName {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class PhoneNumber {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class Email {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class Overview {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class ClassroomId {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class RoleMember {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class Course {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class Semester {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

export class Description {
	@Column()
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}

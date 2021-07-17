import { HttpException, HttpStatus } from "@nestjs/common";

export class ExecutorNotProvidedException extends HttpException {
	constructor() {
		super("ExecutorNotProvidedException: Executor not provided", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

export class ProfileNotFoundException extends HttpException {
	constructor() {
		super("Profile not found", HttpStatus.NOT_FOUND);
	}
}

export class ProfileNotCompatibleType extends HttpException {
	constructor() {
		super("Profile not compatible type", HttpStatus.BAD_REQUEST);
	}
}

export class ExperienceNotExistInProfile extends HttpException {
	constructor() {
		super("Experience not exist in this profile", HttpStatus.BAD_REQUEST);
	}
}

export class ExperienceNotFoundException extends HttpException {
	constructor() {
		super("Experience not found", HttpStatus.NOT_FOUND);
	}
}

export class UsernameAlreadyRegisteredException extends HttpException {
	constructor() {
		super("username has been already registered", HttpStatus.BAD_REQUEST);
	}
}

export class ProfileWrongRole extends HttpException {
	constructor(public message: string) {
		super(message, HttpStatus.FORBIDDEN);
	}
}

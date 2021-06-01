import { HttpException, HttpStatus } from "@nestjs/common";

export class ExecutorNotProvidedException extends HttpException {
	constructor() {
		super("Executor not provided", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

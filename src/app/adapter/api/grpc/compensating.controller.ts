import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

interface EventIdProtobuf {
	eventId: string;
}

interface ServiceResponseProtobuf {
	message: string;
}

@Controller()
export class CompensatingGrpcController {
	logger: Logger = new Logger("CompensatingGrpcController");

	@GrpcMethod("CompensatingExecutor", "Rollback")
	rollback(eventId: EventIdProtobuf): Promise<ServiceResponseProtobuf> {
		this.logger.log(`execute compensating command for event [${eventId}]`);
		return Promise.resolve({ message: "OK" });
	}
}

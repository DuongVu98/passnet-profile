import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

interface UserRegisteredEventProtobuf {
	eventId: string;
	userId: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

interface ServiceResponseProtobuf {
	message: string;
}

const successMessage = "SUCCESS";
const failureMessage = "FAILURE";

@Controller()
export class EventConsumerGateway {
	private logger = new Logger("EventConsumerGateway");

	@GrpcMethod("EventConsumerRpc", "ConsumeUserRegisteredEvent")
	consumeUserRegisteredEvent(event: UserRegisteredEventProtobuf): Promise<ServiceResponseProtobuf> {
		this.logger.log(`consume event: ${event.eventId}`);
		return Promise.resolve({ message: successMessage });
	}
}

import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Builder } from "builder-pattern";
import { CreateProfileCommand } from "src/app/domain/commands/commands";
import { EventConsumeGateway } from "../../controller/consume.gateway";

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
export class EventConsumerGrpc {
	private logger = new Logger("EventConsumerGateway");

	constructor(private consumeGateway: EventConsumeGateway) {}

	@GrpcMethod("EventConsumerRpc", "ConsumeUserRegisteredEvent")
	consumeUserRegisteredEvent(event: UserRegisteredEventProtobuf): Promise<ServiceResponseProtobuf> {
		this.logger.log(`consume event: ${event.eventId}`);

		const command = Builder(CreateProfileCommand)
			.email(event.email)
			.fullName(`${event.firstName} ${event.lastName}`)
			.username(event.username)
			.phoneNumber("")
			.userId(event.userId)
			.build();

		return this.consumeGateway
			.send(command)
			.then(() => {
				return { message: successMessage };
			})
			.catch(error => {
				this.logger.error(`Error during consume event: ${error}`);
				return { message: failureMessage };
			});
	}
}

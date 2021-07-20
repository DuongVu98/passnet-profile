import { Controller, HttpException, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CompensatingHandlerFactory } from "src/app/usecase/factory/compensating-handler.factory";
import { CompensatingBackupService } from "src/app/usecase/services/compensating-backup.service";

interface EventIdProtobuf {
	eventId: string;
}

interface ServiceResponseProtobuf {
	message: string;
}

@Controller()
export class CompensatingGrpcController {
	logger: Logger = new Logger("CompensatingGrpcController");

	constructor(
		private compensatingBackupService: CompensatingBackupService,
		private compensatingHandlerFactory: CompensatingHandlerFactory,
	) {}

	@GrpcMethod("CompensatingExecutor", "Rollback")
	rollback(eventId: EventIdProtobuf): Promise<ServiceResponseProtobuf> {
		this.logger.log(`execute compensating command for event [${eventId.eventId}]`);

		try {
			const compensating = this.compensatingBackupService.findCompensating(eventId.eventId);
			const handler = this.compensatingHandlerFactory.produce(compensating);

			handler.reverse(compensating).then(() => {
				this.logger.log(`Compensating for event ${eventId.eventId} successfully.`);
			});
		} catch (error) {
			this.logger.error(`Error during copensating: ${error}`);
		} finally {
			return Promise.resolve({ message: "OK" });
		}
	}
}

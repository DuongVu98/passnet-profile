import { Module } from "@nestjs/common";
import { UsecaseModule } from "../usecase/usecase.module";
import { EventConsumerGateway } from "./api/grpc/event-consumer.gateway";
import { HomeController } from "./api/rest/home.controller";
import { ProfileController } from "./api/rest/profile.controller";
import { CommandGateway } from "./controller/command.gateway";

@Module({
	controllers: [HomeController, ProfileController, EventConsumerGateway],
	providers: [CommandGateway],
	imports: [UsecaseModule],
})
export class AdapterModule {}

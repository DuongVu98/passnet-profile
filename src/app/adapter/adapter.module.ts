import { Module } from "@nestjs/common";
import { UsecaseModule } from "../usecase/usecase.module";
import { EventConsumerGrpc } from "./api/grpc/event-consumer.controller";
import { HomeController } from "./api/rest/home.controller";
import { ProfileController } from "./api/rest/profile.controller";
import { CommandGateway } from "./controller/command.gateway";
import { EventConsumeGateway } from "./controller/consume.gateway";

@Module({
	controllers: [HomeController, ProfileController, EventConsumerGrpc],
	providers: [CommandGateway, EventConsumeGateway],
	imports: [UsecaseModule],
})
export class AdapterModule {}

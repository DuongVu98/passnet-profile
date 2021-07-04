import { Module } from "@nestjs/common";
import { UsecaseModule } from "../usecase/usecase.module";
import { CompensatingGrpcController } from "./api/grpc/compensating.controller";
import { EventConsumerGrpc } from "./api/grpc/event-consumer.controller";
import { HomeController } from "./api/rest/home.controller";
import { ProfileController } from "./api/rest/profile.controller";
import { CommandGateway } from "./controller/command.gateway";
import { EventConsumeGateway } from "./controller/consume.gateway";

@Module({
	controllers: [HomeController, ProfileController, EventConsumerGrpc, CompensatingGrpcController],
	providers: [CommandGateway, EventConsumeGateway],
	imports: [UsecaseModule],
})
export class AdapterModule {}

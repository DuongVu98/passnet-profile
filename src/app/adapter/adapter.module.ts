import { Module } from "@nestjs/common";
import { UsecaseModule } from "../usecase/usecase.module";
import { HomeController } from "./api/rest/home.controller";
import { ProfileController } from "./api/rest/profile.controller";
import { CommandGateway } from "./controller/command.gateway";

@Module({
	controllers: [HomeController, ProfileController],
	providers: [CommandGateway],
	imports: [UsecaseModule],
})
export class AdapterModule {}

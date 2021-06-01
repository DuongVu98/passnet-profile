import { Module } from "@nestjs/common";
import { CommandExecutorFactory } from "./factory/command-executor.factory";
import { UuidGenerateService } from "./services/uuid-generate.service";

@Module({
	providers: [UuidGenerateService, CommandExecutorFactory],
})
export class UsecaseModule {}

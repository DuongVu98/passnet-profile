import { Module } from "@nestjs/common";
import { DomainModule } from "../domain/domain.module";
import { CommandExecutorChainFactory } from "./factory/command-executor-chain.factory";
import { CommandExecutorFactory } from "./factory/command-executor.factory";
import { ViewProjector } from "./projector/view.projector";
import { UuidGenerateService } from "./services/uuid-generate.service";

@Module({
	imports: [DomainModule],
	providers: [UuidGenerateService, CommandExecutorFactory, CommandExecutorChainFactory, ViewProjector],
	exports: [UuidGenerateService, CommandExecutorFactory, CommandExecutorChainFactory, ViewProjector],
})
export class UsecaseModule {}

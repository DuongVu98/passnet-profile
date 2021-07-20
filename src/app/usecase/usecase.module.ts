import { Module } from "@nestjs/common";
import { DomainModule } from "../domain/domain.module";
import { CommandExecutorChainFactory } from "./factory/command-executor-chain.factory";
import { CommandExecutorFactory } from "./factory/command-executor.factory";
import { CompensatingHandlerFactory } from "./factory/compensating-handler.factory";
import { ViewProjector } from "./projector/view.projector";
import { CompensatingBackupService } from "./services/compensating-backup.service";
import { UuidGenerateService } from "./services/uuid-generate.service";

@Module({
	imports: [DomainModule],
	providers: [
		UuidGenerateService,
		CommandExecutorFactory,
		CommandExecutorChainFactory,
		ViewProjector,
		CompensatingBackupService,
		CompensatingHandlerFactory,
	],
	exports: [
		UuidGenerateService,
		CommandExecutorFactory,
		CommandExecutorChainFactory,
		ViewProjector,
		CompensatingBackupService,
		CompensatingHandlerFactory,
	],
})
export class UsecaseModule {}

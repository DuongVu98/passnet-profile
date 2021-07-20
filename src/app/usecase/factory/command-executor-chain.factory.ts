import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { CompensatingBackupChain, UuidPrepareChain } from "../chain/executor.chain";
import { CommandExecutor } from "../command-executor/command.executor";
import { CompensatingBackupService } from "../services/compensating-backup.service";
import { UuidGenerateService } from "../services/uuid-generate.service";

@Injectable()
export class CommandExecutorChainFactory {
	constructor(private uuidGenerateService: UuidGenerateService, private compensatingBackupService: CompensatingBackupService) {}

	produceUuidPrepairChain(commandExecutor: CommandExecutor): CommandExecutor {
		const chain = Builder(UuidPrepareChain)
			.uuidGenerator(this.uuidGenerateService)
			.build();
		chain.setNextChain = commandExecutor;

		return chain;
	}

	produceCompensatingBackupChain(commandExecutor: CommandExecutor): CommandExecutor {
		const chain = Builder(CompensatingBackupChain)
			.compensatingBackupService(this.compensatingBackupService)
			.build();
		chain.setNextChain = commandExecutor;

		return chain;
	}
}

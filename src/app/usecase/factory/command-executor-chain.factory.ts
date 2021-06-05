import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UuidPrepareChain } from "../chain/executor.chain";
import { CommandExecutor } from "../command-executor/command.executor";
import { UuidGenerateService } from "../services/uuid-generate.service";

@Injectable()
export class CommandExecutorChainFactory {
	constructor(private uuidGenerateService: UuidGenerateService) {}

	produceUuidPrepairChain(commandExecutor: CommandExecutor): CommandExecutor {
		const chain = Builder(UuidPrepareChain)
			.uuidGenerator(this.uuidGenerateService)
			.build();
		chain.setNextChain = commandExecutor;

		return chain;
	}
}

import { BaseCommand } from "src/app/domain/commands/commands";
import { CommandExecutor } from "../command-executor/command.executor";
import { UuidGenerateService } from "../services/uuid-generate.service";

export abstract class CommandExecutorChain implements CommandExecutor {
	protected nextChain: CommandExecutor;

	abstract execute(command: BaseCommand): Promise<any>;

	set setNextChain(next: CommandExecutor) {
		this.nextChain = next;
	}
}

export class UuidPrepareChain extends CommandExecutorChain {
	uuidGenerator: UuidGenerateService;

	execute(command: BaseCommand): Promise<any> {
		command.aggregateId = this.uuidGenerator.generateUUID();
		return this.nextChain.execute(command);
	}
}

import { Injectable } from "@nestjs/common";
import { AddExperienceCommand, BaseCommand } from "src/app/domain/commands/commands";
import { CommandExecutor } from "src/app/usecase/command-executor/command.executor";
import { CommandExecutorChainFactory } from "src/app/usecase/factory/command-executor-chain.factory";
import { CommandExecutorFactory } from "src/app/usecase/factory/command-executor.factory";

@Injectable()
export class CommandGateway {
	constructor(private commandExecutorFactory: CommandExecutorFactory, private commandExecutorChainFactory: CommandExecutorChainFactory) {}

	send(command: BaseCommand): Promise<any> {
		const executor = this.getExecutorChain(command, this.commandExecutorFactory.produce(command));
		return executor.execute(command);
	}

	private getExecutorChain(command: BaseCommand, commandExecutor: CommandExecutor): CommandExecutor {
		// if (command instanceof AddExperienceCommand) {
		// 	return this.commandExecutorChainFactory.produceUuidPrepairChain(commandExecutor);
		// } else {
		// 	return commandExecutor;
		// }
		return commandExecutor;
	}
}

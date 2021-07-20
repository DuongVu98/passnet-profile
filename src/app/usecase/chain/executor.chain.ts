import { Builder } from "builder-pattern";
import { BaseCommand, CreateProfileCommand } from "src/app/domain/commands/commands";
import { BaseCompensating, CreateProfileCompensating } from "src/app/domain/commands/compensating";
import { CommandExecutor } from "../command-executor/command.executor";
import { CompensatingBackupService } from "../services/compensating-backup.service";
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

export class CompensatingBackupChain extends CommandExecutorChain {
	compensatingBackupService: CompensatingBackupService;

	execute(command: BaseCommand): Promise<any> {
		const compensating = this.buildCompensating(command);
		this.compensatingBackupService.storeCompensating(compensating, compensating.eventId);
		return this.nextChain.execute(command);
	}

	private buildCompensating(command: BaseCommand): BaseCompensating {
		if (command instanceof CreateProfileCommand) {
			return Builder(CreateProfileCompensating)
				.eventId(command.eventId)
				.profileId(command.aggregateId)
				.build();
		} else {
			return null;
		}
	}
}

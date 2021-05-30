import { BaseCommand } from "src/app/domain/commands/commands";

export interface CommandExecutor {
	execute(command: BaseCommand): Promise<any>;
}
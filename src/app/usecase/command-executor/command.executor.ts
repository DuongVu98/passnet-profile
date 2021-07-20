import { BaseCommand } from "src/app/domain/commands/commands";
import { BaseCompensating } from "src/app/domain/commands/compensating";

export interface CommandExecutor {
	execute(command: BaseCommand): Promise<any>;
}

export interface CompensatingHandler {
	reverse(compensating: BaseCompensating): Promise<any>;
}

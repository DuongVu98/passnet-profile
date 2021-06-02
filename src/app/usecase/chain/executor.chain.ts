import { BaseCommand } from "src/app/domain/commands/commands";
import { CommandExecutor } from "../command-executor/command.executor";
import { UuidGenerateService } from "../services/uuid-generate.service";

export abstract class CommandExecutorChain implements CommandExecutor {
    
    constructor(protected nextChain: CommandExecutor){}

    abstract execute(command: BaseCommand): Promise<any>;
}

export class UuidPrepareChain extends CommandExecutorChain {

    uuidGenerator: UuidGenerateService;

    execute(command: BaseCommand): Promise<any> {
        command.aggregateId = this.uuidGenerator.generateUUID();
        return this.nextChain.execute(command);
    }
}
import { Injectable } from "@nestjs/common";
import { BaseCommand } from "src/app/domain/commands/commands";
import { CommandExecutorFactory } from "src/app/usecase/factory/command-executor.factory";

@Injectable()
export class CommandGateway {

    constructor(private commandExecutorFactory: CommandExecutorFactory){}

    send(command: BaseCommand): Promise<any> {
        const executor = this.commandExecutorFactory.produce(command);
        return executor.execute(command);
    }
}
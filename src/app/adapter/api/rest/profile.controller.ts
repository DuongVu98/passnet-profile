import { Controller, Get, Post } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { CreateProfileCommand } from "src/app/domain/commands/commands";
import { CommandGateway } from "../../controller/command.gateway";

@Controller("profiles")
export class ProfileController {
	constructor(private commandGateway: CommandGateway) {}

	@Post("create-profile")
	getProfile(): Promise<any> {
		const command = Builder(CreateProfileCommand)
			.email("")
			.fullName("")
			.phoneNumber("")
			.userId("")
			.build();
		return this.commandGateway.send(command);
	}
}

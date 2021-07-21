import { Controller, Get, Param } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { CreateProfileCommand } from "src/app/domain/commands/commands";
import { CommandGateway } from "../../controller/command.gateway";

@Controller("")
export class HomeController {
	constructor(private commandGateway: CommandGateway) {}

	@Get("")
	home(): string {
		return "Welcome to Passnet Profile service";
	}

	@Get("create/:username")
	createProfile(@Param("username") username: string): Promise<any> {
		const command = Builder(CreateProfileCommand)
			.email("email@gmail.com")
			.fullName("fullName")
			.username(username)
			.phoneNumber("")
			.userId("mock-user")
			.cardId("cardId")
			.profileRole("STUDENT")
			.eventId("event-1")
			.build();
		return this.commandGateway.send(command);
	}
}

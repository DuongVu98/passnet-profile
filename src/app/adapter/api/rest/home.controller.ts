import { Body, Controller, Get, Post } from "@nestjs/common";
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

	@Post("mock-profile")
	mockProfile(@Body() body: { id: string; fullName: string; email: string; phoneNumber: string; userId: string }): Promise<any> {
		const command = Builder(CreateProfileCommand)
			.aggregateId(body.id)
			.fullName(body.fullName)
			.email(body.email)
			.phoneNumber(body.phoneNumber)
			.userId(body.userId)
			.build();
		return this.commandGateway.send(command);
	}
}

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandGateway } from "../../controller/command.gateway";

@Controller("")
export class HomeController {
	constructor(private commandGateway: CommandGateway, private profileRepository: ProfileEntityRepository) {}

	@Get("")
	home(): string {
		return "Welcome to Passnet Profile service";
	}
}

import { Body, Controller, Param, Put } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UpdateProfileCommand } from "src/app/domain/commands/commands";
import { UpdateProfileRequest } from "src/app/domain/request/requests";
import { CommandGateway } from "../../controller/command.gateway";

@Controller("profiles")
export class ProfileController {
	constructor(private commandGateway: CommandGateway) {}

	@Put(":id/update-profile")
	updateProfile(@Param("id") profileId: string, @Body() updateProfileRequest: UpdateProfileRequest): Promise<any> {
		const command = Builder(UpdateProfileCommand)
			.aggregateId(profileId)
			.email(updateProfileRequest.email)
			.fullName(updateProfileRequest.fullName)
			.overview(updateProfileRequest.overview)
			.phoneNumber(updateProfileRequest.phoneNumber)
            .build();

        return this.commandGateway.send(command);
	}
}

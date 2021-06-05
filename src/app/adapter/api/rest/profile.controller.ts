import { Body, Controller, Delete, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Builder } from "builder-pattern";
import {
	AddExperienceCommand,
	EditExperienceCommand,
	RemoveExperienceCommand,
	UpdateProfileCommand,
} from "src/app/domain/commands/commands";
import { AddExperienceForm, EditExperienceForm, UpdateProfileForm } from "src/app/domain/form/forms";
import { CommandGateway } from "../../controller/command.gateway";
import { ErrorsInterceptor } from "../../interceptor/error-log.interceptor";

@Controller("api/profiles")
@UseInterceptors(ErrorsInterceptor)
export class ProfileController {
	logger: Logger = new Logger("ProfileController");
	constructor(private commandGateway: CommandGateway) {}

	@Put(":id/update-profile")
	updateProfile(@Param("id") profileId: string, @Body() updateProfileRequest: UpdateProfileForm): Promise<any> {
		const command = Builder(UpdateProfileCommand)
			.aggregateId(profileId)
			.email(updateProfileRequest.email)
			.fullName(updateProfileRequest.fullName)
			.overview(updateProfileRequest.overview)
			.phoneNumber(updateProfileRequest.phoneNumber)
			.build();

		return this.commandGateway.send(command);
	}

	@Post(":id/add-experience")
	addExperience(@Param("id") profileId: string, @Body() addExperienceForm: AddExperienceForm): Promise<any> {
		this.logger.log(`receive requests form for profile ${profileId}`);
		const command = Builder(AddExperienceCommand)
			.aggregateId(profileId)
			.course(addExperienceForm.course)
			.description(addExperienceForm.description)
			.semester(addExperienceForm.semester)
			.build();
		return this.commandGateway.send(command);
	}

	@Put(":id/edit-experience")
	editExperience(@Param("id") profileId: string, @Body() editExperienceForm: EditExperienceForm): Promise<any> {
		this.logger.log(`receive edit-experience form for profile ${profileId}`);

		const command = Builder(EditExperienceCommand)
			.aggregateId(profileId)
			.course(editExperienceForm.course)
			.description(editExperienceForm.description)
			.semester(editExperienceForm.semester)
			.experienceId(editExperienceForm.experienceId)
			.build();

		return this.commandGateway.send(command);
	}

	@Delete(":pid/remove-experience/:eid")
	removeExperience(@Param("pid") profileId: string, @Param("eid") experienceId: string): Promise<any> {
		this.logger.log(`receive remove-experience form for profile ${profileId}`);

		const command = Builder(RemoveExperienceCommand)
			.aggregateId(profileId)
			.experienceId(experienceId)
			.build();

		return this.commandGateway.send(command);
	}
}

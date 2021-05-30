import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Profile } from "src/app/domain/aggregate/entities";
import { Email, FullName, Overview, PhoneNumber, UserId } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, CreateProfileCommand } from "src/app/domain/commands/commands";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class CreateProfileCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateProfileCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof CreateProfileCommand) {
			const newProfile = Builder(Profile)
				.fullName(new FullName(command.fullName))
				.email(new Email(command.email))
				.phoneNumber(new PhoneNumber(command.phoneNumber))
				.userId(new UserId(command.userId))
				.overview(new Overview(""))
				.classrooms([])
				.experiences([])
				.build();

			return this.profileRepository.save(newProfile).then(profile => {
                this.logger.log(`Profile created: ${profile.id}`);
            });
		}
	}
}

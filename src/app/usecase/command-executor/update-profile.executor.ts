import { Logger } from "@nestjs/common";
import { Email, FullName, Overview, PhoneNumber } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, UpdateProfileCommand } from "src/app/domain/commands/commands";
import { ProfileNotFoundException } from "src/app/domain/exception/exceptions";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class UpdateProfileCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("UpdateProfileCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof UpdateProfileCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => this.exists(profile))
				.then(profile => {
					profile.fullName = new FullName(command.fullName);
					profile.phoneNumber = new PhoneNumber(command.phoneNumber);
					profile.email = new Email(command.email);
					profile.overview = new Overview(command.overview);

					return this.profileRepository.save(profile);
				})
				.then(profile => {
					this.logger.log(`Profile updated: ${profile.id}`);
				});
		} else {
			return Promise.reject();
		}
	}

	private exists(value: any): Promise<any> {
		return value != null ? Promise.resolve(value) : Promise.reject(new ProfileNotFoundException());
	}
}

import { Logger } from "@nestjs/common";
import { BaseCommand, RemoveExperienceCommand } from "src/app/domain/commands/commands";
import { ExperienceEntityRepository } from "src/app/domain/repository/experience.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class RemoveExperienceCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("RemoveExperienceCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository, private experienceRepository: ExperienceEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof RemoveExperienceCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => {
					return Promise.all([profile, this.experienceRepository.findById(command.experienceId)]);
				})
				.then(values => {
					const profile = values[0];
					const experience = values[1];

					if (profile.containExperience(experience)) {
						return Promise.all([profile, this.experienceRepository.delete(experience.id)]);
					} else {
						return Promise.reject();
					}
				})
				.then(values => {
					this.logger.log(`Experience deleted for id ${values[1].id} and profile id ${values[0].id}`);
				});
		} else {
			return Promise.reject();
		}
	}
}

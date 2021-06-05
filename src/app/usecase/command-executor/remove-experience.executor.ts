import { Logger } from "@nestjs/common";
import { Experience, Profile } from "src/app/domain/aggregate/entities";
import { BaseCommand, RemoveExperienceCommand } from "src/app/domain/commands/commands";
import { ExperienceNotExistInProfile, ExperienceNotFoundException, ProfileNotFoundException } from "src/app/domain/exception/exceptions";
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
				.then(profile => this.exists(profile))
				.then(profile => Promise.all([profile, this.experienceRepository.findById(command.experienceId)]))
				.then(values => Promise.all([values[0], this.experienceExist(values[1])]))
				.then(values => this.profileContainsExperience(values[0], values[1]))
				.then(values => {
					const profile = values[0];
					const experience = values[1];

					return Promise.all([profile, this.experienceRepository.delete(experience.id)]);
				})
				.then(values => {
					this.logger.log(`Experience deleted for id ${values[1].id} and profile id ${values[0].id}`);
				});
		} else {
			return Promise.reject();
		}
	}

	private exists(value: any): Promise<any> {
		return value != null ? Promise.resolve(value) : Promise.reject(new ProfileNotFoundException());
	}

	private experienceExist(value: any): Promise<any> {
		return value != null ? Promise.resolve(value) : Promise.reject(new ExperienceNotFoundException());
	}

	private profileContainsExperience(profile: Profile, experience: Experience): Promise<[Profile, Experience]> {
		return profile.containExperience(experience)
			? Promise.all([profile, experience])
			: Promise.reject(new ExperienceNotExistInProfile());
	}
}

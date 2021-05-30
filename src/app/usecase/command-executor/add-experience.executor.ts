import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Experience } from "src/app/domain/aggregate/entities";
import { Course, Description, Semester } from "src/app/domain/aggregate/value-objects";
import { AddExperienceCommand, BaseCommand } from "src/app/domain/commands/commands";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class AddExperienceCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddExperienceCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddExperienceCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => {
					const newExperience = Builder(Experience)
						.profile(profile)
						.course(new Course(command.course))
						.description(new Description(command.description))
						.semester(new Semester(command.semester))
						.build();
					profile.experiences.push(newExperience);

					return this.profileRepository.save(profile);
				})
				.then(profile => {
					this.logger.log(`profile updated for profile ${profile.id}`);
					this.logger.log(`Experience added - number of experiences: ${profile.experiences.length}`);
				});
		} else {
			return Promise.reject();
		}
	}
}

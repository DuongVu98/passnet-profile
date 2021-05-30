import { Logger } from "@nestjs/common";
import { Course, Description, Semester } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, EditExperienceCommand } from "src/app/domain/commands/commands";
import { ExperienceEntityRepository } from "src/app/domain/repository/experience.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class EditExperienceCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("EditExperienceCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository, private experienceRepository: ExperienceEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof EditExperienceCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => {
					return Promise.all([profile, this.experienceRepository.findById(command.experienceId)]);
				})
				.then(values => {
					const profile = values[0];
					const experience = values[1];

					if (profile.containExperience(experience)) {
						experience.course = new Course(command.course);
						experience.description = new Description(command.description);
						experience.semester = new Semester(command.semester);

						return Promise.all([profile, this.experienceRepository.update(experience)]);
					} else {
						return Promise.reject();
					}
				})
				.then(values => {
					this.logger.log(`Experience updated for id ${values[1].id} and profile id ${values[0].id}`);
				});
		} else {
			return Promise.reject();
		}
	}
}

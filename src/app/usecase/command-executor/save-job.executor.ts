import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Job, Profile } from "src/app/domain/aggregate/entities";
import { JobId } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, SaveJobCommand } from "src/app/domain/commands/commands";
import { ProfileNotFoundException } from "src/app/domain/exception/exceptions";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class SaveJobExecutor implements CommandExecutor {
	logger: Logger = new Logger("RemoveExperienceCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof SaveJobCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => this.exists(profile))
				.then(profile => {
					const newSavedJob = Builder(Job)
						.jobId(new JobId(command.jobId))
						.savedBy(profile)
						.build();
					profile.savedJobs.push(newSavedJob);
					return this.profileRepository.save(profile);
				})
				.then(profile => {
					this.logger.log(`profile saved new job with number is ${profile.savedJobs.length}`);
				});
		}
	}

	private exists(value: any): Promise<Profile> {
		if (value == null) {
			return Promise.reject(new ProfileNotFoundException());
		} else {
			return Promise.resolve(value);
		}
	}
}

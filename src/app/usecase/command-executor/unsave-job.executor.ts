import { Logger } from "@nestjs/common";
import { Profile } from "src/app/domain/aggregate/entities";
import { BaseCommand, UnSaveJobCommand } from "src/app/domain/commands/commands";
import { ProfileNotFoundException } from "src/app/domain/exception/exceptions";
import { JobEntityRepository } from "src/app/domain/repository/job.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class UnSaveJobExecutor implements CommandExecutor {
	logger: Logger = new Logger("RemoveExperienceCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository, private jobRepository: JobEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof UnSaveJobCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => this.exists(profile))
				.then(profile => this.jobRepository.findByIdAndProfile(command.jobId, profile))
				.then(job => this.jobRepository.delete(job.id));
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

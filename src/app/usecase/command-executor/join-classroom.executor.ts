import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/app/domain/aggregate/entities";
import { ClassroomId, RoleMember } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, JoinClassroomCommand } from "src/app/domain/commands/commands";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class JoinClassroomCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateProfileCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof JoinClassroomCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => {
					const newClassroom = Builder(Classroom)
						.classroomId(new ClassroomId(command.classroomId))
						.roleMember(new RoleMember(command.roleMember))
						.profile(profile)
						.build();
					profile.classrooms.push(newClassroom);

					return this.profileRepository.save(profile);
				})
				.then(profile => {
					this.logger.log(`Classroom added: number of classrooms: ${profile.classrooms.length}`);
				});
		} else {
			return Promise.reject();
		}
	}
}

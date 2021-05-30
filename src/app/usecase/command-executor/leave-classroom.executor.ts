import { Logger } from "@nestjs/common";
import { ClassroomId } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, LeaveClassroomCommand } from "src/app/domain/commands/commands";
import { ClassroomEntityRepository } from "src/app/domain/repository/classroom.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class LeaveClassroomCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("LeaveClassroomCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository, private classroomRepository: ClassroomEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof LeaveClassroomCommand) {
			return this.profileRepository
				.findById(command.aggregateId)
				.then(profile => {
					return Promise.all([profile, this.classroomRepository.findByClassroomId(new ClassroomId(command.classroomId))]);
				})
				.then(values => {
					const profile = values[0];
					const classroom = values[1];

					if (profile.containClassroom(classroom)) {
						return Promise.all([profile, this.classroomRepository.delete(classroom.id)]);
					} else {
						return Promise.reject();
					}
				})
				.then(values => {
					this.logger.log(`Classroom removed for profile: ${values[0]}`);
				});
		} else {
			return Promise.reject();
		}
	}
}

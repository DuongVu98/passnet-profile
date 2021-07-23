import { Injectable } from "@nestjs/common";
import {
	AddExperienceCommand,
	BaseCommand,
	CreateProfileCommand,
	EditExperienceCommand,
	JoinClassroomCommand,
	LeaveClassroomCommand,
	RemoveExperienceCommand,
	SaveJobCommand,
	UnSaveJobCommand,
	UpdateProfileCommand,
} from "src/app/domain/commands/commands";
import { ExecutorNotProvidedException } from "src/app/domain/exception/exceptions";
import { ClassroomEntityRepository } from "src/app/domain/repository/classroom.repository";
import { ExperienceEntityRepository } from "src/app/domain/repository/experience.repository";
import { JobEntityRepository } from "src/app/domain/repository/job.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { AddExperienceCommandExecutor } from "../command-executor/add-experience.executor";
import { CommandExecutor } from "../command-executor/command.executor";
import { CreateProfileCommandExecutor } from "../command-executor/create-profile.executor";
import { EditExperienceCommandExecutor } from "../command-executor/edit-experience.executor";
import { JoinClassroomCommandExecutor } from "../command-executor/join-classroom.executor";
import { LeaveClassroomCommandExecutor } from "../command-executor/leave-classroom.executor";
import { RemoveExperienceCommandExecutor } from "../command-executor/remove-experience.executor";
import { SaveJobExecutor } from "../command-executor/save-job.executor";
import { UnSaveJobExecutor } from "../command-executor/unsave-job.executor";
import { UpdateProfileCommandExecutor } from "../command-executor/update-profile.executor";

@Injectable()
export class CommandExecutorFactory {
	constructor(
		private profileRepository: ProfileEntityRepository,
		private classroomRepository: ClassroomEntityRepository,
		private experienceRepository: ExperienceEntityRepository,
		private jobRepository: JobEntityRepository,
	) {}

	produce(command: BaseCommand): CommandExecutor {
		if (command instanceof CreateProfileCommand) {
			return this.produceCreateProfileExecutor(command);
		} else if (command instanceof UpdateProfileCommand) {
			return this.produceUpdateProfileExecutor(command);
		} else if (command instanceof JoinClassroomCommand) {
			return this.produceJoinClassroomExecutor(command);
		} else if (command instanceof LeaveClassroomCommand) {
			return this.produceLeaveClassroomExecutor(command);
		} else if (command instanceof AddExperienceCommand) {
			return this.produceAddExperienceExecutor(command);
		} else if (command instanceof EditExperienceCommand) {
			return this.produceEditExperienceExecutor(command);
		} else if (command instanceof RemoveExperienceCommand) {
			return this.produceRemoveExperieceExecutor(command);
		} else if (command instanceof SaveJobCommand) {
			return this.produceSaveJobExecutor(command);
		} else if (command instanceof UnSaveJobCommand) {
			return this.produceUnSaveJobExecutor(command);
		} else {
			throw new ExecutorNotProvidedException();
		}
	}

	private produceCreateProfileExecutor(commmand: CreateProfileCommand): CommandExecutor {
		return new CreateProfileCommandExecutor(this.profileRepository);
	}

	private produceUpdateProfileExecutor(command: UpdateProfileCommand): CommandExecutor {
		return new UpdateProfileCommandExecutor(this.profileRepository);
	}

	private produceJoinClassroomExecutor(command: JoinClassroomCommand): CommandExecutor {
		return new JoinClassroomCommandExecutor(this.profileRepository);
	}

	private produceLeaveClassroomExecutor(command: LeaveClassroomCommand): CommandExecutor {
		return new LeaveClassroomCommandExecutor(this.profileRepository, this.classroomRepository);
	}

	private produceAddExperienceExecutor(command: AddExperienceCommand): CommandExecutor {
		return new AddExperienceCommandExecutor(this.profileRepository);
	}

	private produceEditExperienceExecutor(command: EditExperienceCommand): CommandExecutor {
		return new EditExperienceCommandExecutor(this.profileRepository, this.experienceRepository);
	}

	private produceRemoveExperieceExecutor(command: RemoveExperienceCommand): CommandExecutor {
		return new RemoveExperienceCommandExecutor(this.profileRepository, this.experienceRepository);
	}

	private produceSaveJobExecutor(command: SaveJobCommand): CommandExecutor {
		return new SaveJobExecutor(this.profileRepository);
	}

	private produceUnSaveJobExecutor(command: UnSaveJobCommand): CommandExecutor {
		return new UnSaveJobExecutor(this.profileRepository, this.jobRepository);
	}
}

import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Profile, StudentProfile, TeacherProfile } from "src/app/domain/aggregate/entities";
import { Email, FullName, Overview, PhoneNumber, UserId, Username } from "src/app/domain/aggregate/value-objects";
import { BaseCommand, CreateProfileCommand } from "src/app/domain/commands/commands";
import { UsernameAlreadyRegisteredException } from "src/app/domain/exception/exceptions";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CommandExecutor } from "./command.executor";

export class CreateProfileCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateProfileCommandExecutor");

	constructor(private profileRepository: ProfileEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof CreateProfileCommand) {
			return this.profileRepository
				.findByUsername(new Username(command.username))
				.then(result => {
					if (result != null) {
						this.logger.log("This username has been already registered");
						return Promise.reject(new UsernameAlreadyRegisteredException());
					} else {
						this.logger.log("This username is new");
						return Promise.resolve();
					}
				})
				.then(() => {
					const newProfile = this.profileToCreate(command.profileRole, command);

					return this.profileRepository.save(newProfile).then(profile => {
						this.logger.log(`Profile created: ${profile.id}`);
					});
				});
		} else {
			return Promise.reject();
		}
	}

	private profileToCreate(role: string, command: CreateProfileCommand): Profile {
		switch (role) {
			case "STUDENT":
				return Builder(StudentProfile)
					.id(command.aggregateId)
					.fullName(new FullName(command.fullName))
					.email(new Email(command.email))
					.phoneNumber(new PhoneNumber(command.phoneNumber))
					.userId(new UserId(command.userId))
					.overview(new Overview(""))
					.username(new Username(command.username))
					.classrooms([])
					.experiences([])
					.build();
			case "TEACHER":
				return Builder(TeacherProfile)
					.id(command.aggregateId)
					.fullName(new FullName(command.fullName))
					.email(new Email(command.email))
					.phoneNumber(new PhoneNumber(command.phoneNumber))
					.userId(new UserId(command.userId))
					.username(new Username(command.username))
					.classrooms([])
					.build();
		}
	}
}

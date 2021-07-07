import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { UserId } from "src/app/domain/aggregate/value-objects";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { ProfileView } from "src/app/domain/view/views";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private profileRepository: ProfileEntityRepository) {}

	getProfile(id: string): Promise<ProfileView> {
		return this.profileRepository.findById(id).then(profile => {
			return Builder(ProfileView)
				.uid(profile.userId.value)
				.profileId(profile.id)
				.email(profile.email.value)
				.fullName(profile.fullName.value)
				.username(profile.username.value)
				.phoneNumber(profile.phoneNumber.value)
				.classroomIds(profile.classrooms.map(classroom => classroom.id))
				.experienceIds(profile.experiences.map(experience => experience.id))
				.build();
		});
	}

	getProfileByUid(uid: string): Promise<ProfileView> {
		return this.profileRepository.findByUserId(new UserId(uid)).then(profile => {
			return Builder(ProfileView)
				.uid(profile.userId.value)
				.profileId(profile.id)
				.email(profile.email.value)
				.fullName(profile.fullName.value)
				.username(profile.username.value)
				.phoneNumber(profile.phoneNumber.value)
				.classroomIds(profile.classrooms.map(classroom => classroom.id))
				.experienceIds(profile.experiences.map(experience => experience.id))
				.build();
		});
	}
}

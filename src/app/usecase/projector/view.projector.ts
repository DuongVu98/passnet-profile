import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { StudentProfile } from "src/app/domain/aggregate/entities";
import { UserId } from "src/app/domain/aggregate/value-objects";
import { ProfileNotCompatibleType } from "src/app/domain/exception/exceptions";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { ExperienceView, ProfileView } from "src/app/domain/view/views";
import { ProfileMapper } from "../services/mapping.service";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private profileRepository: ProfileEntityRepository) {}

	getProfile(id: string): Promise<ProfileView> {
		return this.profileRepository.findById(id).then(profile => {
			return new ProfileMapper(profile).toProfileView();
		});
	}

	getProfileByUid(uid: string): Promise<ProfileView> {
		return this.profileRepository.findByUserId(new UserId(uid)).then(profile => {
			return new ProfileMapper(profile).toProfileView();
		});
	}

	getExperienceByProfile(profileId: string): Promise<ExperienceView[]> {
		return this.profileRepository.findById(profileId).then(profile => {
			if (profile instanceof StudentProfile) {
				return profile.experiences.map(experience => {
					return Builder(ExperienceView)
						.profile({
							profileId: profileId,
							email: profile.email.value,
						})
						.course(experience.course.value)
						.description(experience.description.value)
						.semester(experience.semester.value)
						.build();
				});
			} else {
				return Promise.reject(new ProfileNotCompatibleType());
			}
		});
	}
}

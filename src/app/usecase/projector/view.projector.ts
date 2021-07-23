import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { StudentProfile } from "src/app/domain/aggregate/entities";
import { UserId } from "src/app/domain/aggregate/value-objects";
import {
	ExperienceNotFoundException,
	ProfileNotCompatibleType,
	ProfileNotFoundException,
	ProfileWrongRole,
} from "src/app/domain/exception/exceptions";
import { ExperienceEntityRepository } from "src/app/domain/repository/experience.repository";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { ExperienceView, JobView, ProfileView } from "src/app/domain/view/views";
import { ProfileMapper } from "../services/mapping.service";

@Injectable()
export class ViewProjector {
	logger: Logger = new Logger("ViewProjector");

	constructor(private profileRepository: ProfileEntityRepository, private expRepository: ExperienceEntityRepository) {}

	getProfile(id: string): Promise<ProfileView> {
		return this.profileRepository.findById(id).then(profile => {
			return new ProfileMapper(profile).toProfileView();
		});
	}

	getProfileByUid(uid: string): Promise<ProfileView> {
		return this.profileRepository.findByUserId(new UserId(uid)).then(profile => {
			if (profile != null) {
				return new ProfileMapper(profile).toProfileView();
			} else {
				this.logger.error(`Profile with uid [${uid}] not found`);
				throw new ProfileNotFoundException();
			}
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
						.experienceId(experience.id)
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

	getExperienceById(expId: string, profileId: string): Promise<ExperienceView> {
		return this.profileRepository
			.findById(profileId)
			.then(profile => {
				if (profile instanceof StudentProfile) {
					const exp = profile.experiences.find(elem => elem.id === expId);
					if (exp != null) {
						return Promise.all([profile, exp]);
					} else {
						return Promise.reject(new ExperienceNotFoundException());
					}
				} else {
					return Promise.reject(new ProfileWrongRole("this profile has wrong role"));
				}
			})
			.then(values => {
				const profile = values[0];
				const experience = values[1];
				return Builder(ExperienceView)
					.profile({
						profileId: profileId,
						email: profile.email.value,
					})
					.experienceId(experience.id)
					.course(experience.course.value)
					.description(experience.description.value)
					.semester(experience.semester.value)
					.build();
			});
	}

	getSavedJobs(profileId: string): Promise<JobView[]> {
		return this.profileRepository.findById(profileId).then(profile => {
			return profile.savedJobs.map(job =>
				Builder(JobView)
					.jobId(job.jobId.value)
					.id(job.id)
					.build(),
			);
		});
	}
}

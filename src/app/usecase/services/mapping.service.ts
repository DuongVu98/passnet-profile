import { Builder } from "builder-pattern";
import { Profile, StudentProfile, TeacherProfile } from "src/app/domain/aggregate/entities";
import { ProfileView } from "src/app/domain/view/views";

export class ProfileMapper {
	constructor(private profile: Profile) {}

	toProfileView(): ProfileView {
		const builder = Builder(ProfileView)
			.uid(this.profile.userId.value)
			.profileId(this.profile.id)
			.email(this.profile.email.value)
			.fullName(this.profile.fullName.value)
			.username(this.profile.username.value)
			.phoneNumber(this.profile.phoneNumber.value)
			.classroomIds(this.profile.classrooms.map(classroom => classroom.id));
		if (this.profile instanceof StudentProfile) {
			return builder
				.student({
					overview: this.profile.overview.value,
					experienceIds: this.profile.experiences.map(experience => experience.id),
					cardId: this.profile.cardId.value,
				})
				.build();
		} else if (this.profile instanceof TeacherProfile) {
			return builder.teacher({}).build();
		} else {
			return builder.build();
		}
	}
}

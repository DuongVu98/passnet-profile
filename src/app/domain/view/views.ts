export class ProfileView {
	profileId: string;
	uid: string;
	username: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	classroomIds: string[];
	student?: {
		overview: string;
		experienceIds: string[];
		cardId: string;
	};
	teacher?: any;
}

export class ExperienceView {
	course: string;
	semester: string;
	description: string;
}

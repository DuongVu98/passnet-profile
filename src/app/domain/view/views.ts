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
	profile: {
		profileId: string;
		email: string;
	};
	experienceId: string;
	course: string;
	semester: string;
	description: string;
}

export class JobView {
	id: string;
	jobId: string;
}

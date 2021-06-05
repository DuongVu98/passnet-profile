export class UpdateProfileForm {
	fullName: string;
	email: string;
	phoneNumber: string;
	overview: string;
}

export class AddExperienceForm {
	course: string;
	semester: string;
	description: string;
}

export class EditExperienceForm {
	experienceId: string;
	course: string;
	semester: string;
	description: string;
}

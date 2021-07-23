export class BaseCommand {
	aggregateId: string;
	eventId?: string;
}

export class CreateProfileCommand extends BaseCommand {
	fullName: string;
	phoneNumber: string;
	email: string;
	username: string;
	userId: string;
	cardId: string;
	profileRole: string;
}

export class UpdateProfileCommand extends BaseCommand {
	fullName: string;
	cardId: string;
	phoneNumber: string;
	email: string;
	overview: string;
}

export class JoinClassroomCommand extends BaseCommand {
	classroomId: string;
	roleMember: string;
}

export class LeaveClassroomCommand extends BaseCommand {
	classroomId: string;
}

export class AddExperienceCommand extends BaseCommand {
	course: string;
	semester: string;
	description: string;
}

export class EditExperienceCommand extends BaseCommand {
	experienceId: string;
	course: string;
	semester: string;
	description: string;
}

export class RemoveExperienceCommand extends BaseCommand {
	experienceId: string;
}

export class SaveJobCommand extends BaseCommand {
	jobId: string;
}

export class UnSaveJobCommand extends BaseCommand {
	jobId: string;
}

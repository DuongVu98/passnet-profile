export class BaseCommand {
    aggregateId: string;
}

export class CreateProfileCommand extends BaseCommand {
    fullName: string;
    phoneNumber: string;
    email: string;
    userId: string;
}

export class UpdateProfileCommand extends BaseCommand {
    fullName: string;
    phoneNumber: string;
    email: string;
    overview: string;
}

/**
 * ClassroomId should be Id from classroom-service
 */
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
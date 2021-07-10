import { ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import {
	CardId,
	ClassroomId,
	Course,
	Description,
	Email,
	FullName,
	Overview,
	PhoneNumber,
	RoleMember,
	Semester,
	UserId,
	Username,
} from "./value-objects";

@Entity({ name: "profile" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Profile {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column(() => UserId, { prefix: "user_id" })
	userId: UserId;

	@Column(() => Username, { prefix: "username" })
	username: Username;

	@Column(() => FullName, { prefix: "full_name" })
	fullName: FullName;

	@Column(() => PhoneNumber, { prefix: "phone_number" })
	phoneNumber: PhoneNumber;

	@Column(() => Email, { prefix: "email" })
	email: Email;

	@OneToMany(
		() => Classroom,
		c => c.profile,
		{ cascade: ["insert", "remove", "update"] },
	)
	classrooms: Classroom[];

	containClassroom(classroomToCheck: Classroom): boolean {
		return this.classrooms.some(classroom => classroom.id === classroomToCheck.id);
	}
}

@ChildEntity({ type: "student_profile" })
export class StudentProfile extends Profile {
	@Column(() => CardId, { prefix: "card_id" })
	cardId: CardId;

	@Column(() => Overview, { prefix: "overview" })
	overview: Overview;

	@OneToMany(
		() => Experience,
		e => e.profile,
		{ cascade: ["insert", "remove", "update"] },
	)
	experiences: Experience[];

	containExperience(experienceToCheck: Experience): boolean {
		return this.experiences.some(experience => experience.id === experienceToCheck.id);
	}
}

@ChildEntity({ type: "teacher_profile" })
export class TeacherProfile extends Profile {}

@Entity({ name: "classroom" })
export class Classroom {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column(() => ClassroomId, { prefix: "classroom_id" })
	classroomId: ClassroomId;

	@Column(() => RoleMember, { prefix: "role_member" })
	roleMember: RoleMember;

	@ManyToOne(
		() => Profile,
		p => p.classrooms,
	)
	profile: Profile;
}

@Entity({ name: "experience" })
export class Experience {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column(() => ClassroomId, { prefix: "classroom_id" })
	course: Course;

	@Column(() => Semester, { prefix: "semester" })
	semester: Semester;

	@Column(() => Description, { prefix: "description" })
	description: Description;

	@ManyToOne(
		() => StudentProfile,
		p => p.experiences,
	)
	profile: Profile;
}

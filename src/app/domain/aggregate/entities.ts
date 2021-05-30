import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassroomId, Course, Description, Email, FullName, Overview, PhoneNumber, RoleMember, Semester, UserId } from "./value-objects";

@Entity({ name: "profile" })
export class Profile {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column(() => UserId, { prefix: "user_id" })
	userId: UserId;

	@Column(() => FullName, { prefix: "full_name" })
	fullName: FullName;

	@Column(() => PhoneNumber, { prefix: "phone_number" })
	phoneNumber: PhoneNumber;

	@Column(() => Email, { prefix: "email" })
	email: Email;

	@Column(() => Overview, { prefix: "overview" })
	overview: Overview;

	@OneToMany(
		() => Classroom,
		c => c.profile,
		{ cascade: ["insert", "remove", "update"] },
	)
	classrooms: Classroom[];

	@OneToMany(
		() => Experience,
		e => e.profile,
		{ cascade: ["insert", "remove", "update"] },
	)
	experiences: Experience[];

	containClassroom(classroomToCheck: Classroom): boolean {
		return this.classrooms.some(classroom => classroom.id === classroomToCheck.id);
	}

	containExperience(experienceToCheck: Experience): boolean {
		return this.experiences.some(experience => experience.id === experienceToCheck.id);
	}
}

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
		() => Profile,
		p => p.experiences,
	)
	profile: Profile;
}

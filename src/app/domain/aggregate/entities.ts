import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassroomId, Course, Description, Email, FullName, Overview, PhoneNumber, RoleMember, Semester, UserId } from "./value-objects";

@Entity({name: "profile"})
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

    @OneToMany(() => Classroom, c => c.profile)
    classrooms: Classroom[];

    @OneToMany(() => Experience, e => e.profile)
    experiences: Experience[];
}

@Entity({name: "classroom"})
export class Classroom {
    
	@PrimaryGeneratedColumn("uuid")
    id: string;

    @Column(() => ClassroomId, {prefix: "classroomId"})
    classroomId: ClassroomId;

    @Column(() => RoleMember, {prefix: "role_member"})
    roleMember: RoleMember;

    @ManyToOne(() => Profile, p => p.classrooms)
    profile: Profile;
    
}

@Entity({name: "experience"})
export class Experience {
    
	@PrimaryGeneratedColumn("uuid")
    id: string;

    @Column(() => ClassroomId, {prefix: "classroomId"})
    course: Course;

    @Column(() => Semester, {prefix: "semester"})
    semester: Semester;

    @Column(() => Description, {prefix: "description"})
    description: Description;

    @ManyToOne(() => Profile, p => p.experiences)
    profile: Profile;
}

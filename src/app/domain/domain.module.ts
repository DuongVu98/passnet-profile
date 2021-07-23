import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Experience, Job, Profile, StudentProfile, TeacherProfile } from "./aggregate/entities";
import { ClassroomEntityRepository } from "./repository/classroom.repository";
import { ExperienceEntityRepository } from "./repository/experience.repository";
import { JobEntityRepository } from "./repository/job.repository";
import { ProfileEntityRepository } from "./repository/profile.repository";

@Module({
	imports: [TypeOrmModule.forFeature([Profile, StudentProfile, TeacherProfile, Classroom, Experience, Job])],
	providers: [ProfileEntityRepository, ClassroomEntityRepository, ExperienceEntityRepository, JobEntityRepository],
	exports: [ProfileEntityRepository, ClassroomEntityRepository, ExperienceEntityRepository, JobEntityRepository],
})
export class DomainModule {}

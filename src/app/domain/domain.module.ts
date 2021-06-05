import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Experience, Profile } from "./aggregate/entities";
import { ClassroomEntityRepository } from "./repository/classroom.repository";
import { ExperienceEntityRepository } from "./repository/experience.repository";
import { ProfileEntityRepository } from "./repository/profile.repository";

@Module({
	imports: [TypeOrmModule.forFeature([Profile, Classroom, Experience])],
	providers: [ProfileEntityRepository, ClassroomEntityRepository, ExperienceEntityRepository],
	exports: [ProfileEntityRepository, ClassroomEntityRepository, ExperienceEntityRepository],
})
export class DomainModule {}

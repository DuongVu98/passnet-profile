import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Experience, Profile } from "./aggregate/entities";
import { ProfileEntityRepository } from "./repository/profile.repository";

@Module({
	imports: [TypeOrmModule.forFeature([Profile, Classroom, Experience])],
    providers: [ProfileEntityRepository]
})
export class DomainModule {}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile, StudentProfile, TeacherProfile } from "../aggregate/entities";
import { Email, UserId, Username } from "../aggregate/value-objects";

@Injectable()
export class ProfileEntityRepository {
	constructor(
		@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
		@InjectRepository(StudentProfile) private readonly studentProfileRepository: Repository<StudentProfile>,
		@InjectRepository(TeacherProfile) private readonly teacherProfileRepository: Repository<TeacherProfile>,
	) {}

	findAll(): Promise<Profile[]> {
		return this.profileRepository.find();
	}

	findById(id: string): Promise<Profile> {
		return this.profileRepository.findOne({ id: id }, { relations: ["experiences", "classrooms"] });
	}

	findByUserId(userId: UserId): Promise<Profile> {
		return this.profileRepository.findOne({ userId: userId }, { relations: ["experiences", "classrooms"] });
	}

	findByEmail(email: Email): Promise<Profile> {
		return this.profileRepository.findOne({ email: email });
	}

	findByUsername(username: Username): Promise<Profile> {
		return this.profileRepository.findOne({ username: username });
	}

	save(profile: Profile): Promise<Profile> {
		if (profile instanceof StudentProfile) {
			return this.studentProfileRepository.save(profile);
		} else if (profile instanceof TeacherProfile) {
			return this.teacherProfileRepository.save(profile);
		} else {
			return this.profileRepository.save(profile);
		}
	}

	update(id: string, profile: Profile): Promise<Profile> {
		this.profileRepository.update(id, profile);
		return this.profileRepository.findOne({ id: id });
	}

	delete(id: string): Promise<any> {
		return this.profileRepository.delete(id);
	}
}

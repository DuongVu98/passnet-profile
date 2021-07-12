import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile, StudentProfile, TeacherProfile } from "../aggregate/entities";
import { Email, UserId, Username } from "../aggregate/value-objects";

@Injectable()
export class ProfileEntityRepository {
	logger: Logger = new Logger("ProfileEntityRepository");

	constructor(
		@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
		@InjectRepository(StudentProfile) private readonly studentProfileRepository: Repository<StudentProfile>,
		@InjectRepository(TeacherProfile) private readonly teacherProfileRepository: Repository<TeacherProfile>,
	) {}

	findAll(): Promise<Profile[]> {
		return this.studentProfileRepository.find();
	}

	findById(id: string): Promise<Profile> {
		return this.studentProfileRepository.findOne({ id: id }, { relations: ["experiences", "classrooms"] }).then(result => {
			if (result != null) {
				return result;
			} else {
				return this.teacherProfileRepository.findOne({ id: id }, { relations: ["classrooms"] });
			}
		});
	}

	findByUserId(userId: UserId): Promise<Profile> {
		return this.studentProfileRepository.findOne({ userId: userId }, { relations: ["experiences", "classrooms"] }).then(result => {
			if (result != null) {
				return result;
			} else {
				return this.teacherProfileRepository.findOne({ userId: userId }, { relations: ["classrooms"] });
			}
		});
	}

	findByEmail(email: Email): Promise<Profile> {
		return this.studentProfileRepository.findOne({ email: email }, { relations: ["experiences", "classrooms"] }).then(result => {
			if (result != null) {
				return result;
			} else {
				return this.teacherProfileRepository.findOne({ email: email }, { relations: ["classrooms"] });
			}
		});
	}

	findByUsername(username: Username): Promise<Profile> {
		return this.studentProfileRepository.findOne({ username: username }, { relations: ["experiences", "classrooms"] }).then(result => {
			if (result != null) {
				return result;
			} else {
				return this.teacherProfileRepository.findOne({ username: username }, { relations: ["classrooms"] });
			}
		});
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

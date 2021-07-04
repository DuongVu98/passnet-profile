import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "../aggregate/entities";
import { Email, UserId, Username } from "../aggregate/value-objects";

@Injectable()
export class ProfileEntityRepository {
	constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {}

	findAll(): Promise<Profile[]> {
		return this.profileRepository.find();
	}

	findById(id: string): Promise<Profile> {
		return this.profileRepository.findOne({ id: id }, { relations: ["experiences", "classrooms"] });
	}

	findByUserId(userId: UserId): Promise<Profile> {
		return this.profileRepository.findOne({ userId: userId });
	}

	findByEmail(email: Email): Promise<Profile> {
		return this.profileRepository.findOne({ email: email });
	}

	findByUsername(username: Username): Promise<Profile> {
		return this.profileRepository.findOne({ username: username });
	}

	save(profile: Profile): Promise<Profile> {
		return this.profileRepository.save(profile);
	}

	update(id: string, profile: Profile): Promise<Profile> {
		this.profileRepository.update(id, profile);
		return this.profileRepository.findOne({ id: id });
	}

	delete(id: string): Promise<any> {
		return this.profileRepository.delete(id);
	}
}

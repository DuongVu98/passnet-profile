import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Experience } from "../aggregate/entities";

@Injectable()
export class ExperienceEntityRepository {
	constructor(@InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>) {}

	findById(id: string): Promise<Experience> {
		return this.experienceRepository.findOne({ id: id });
	}

	update(experience: Experience): Promise<Experience> {
		return this.experienceRepository.update(experience.id, experience).then(() => {
			return this.experienceRepository.findOne({ id: experience.id });
		});
	}

	delete(id: string): Promise<any> {
		return this.experienceRepository.delete({ id: id });
	}
}

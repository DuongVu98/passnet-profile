import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Job, Profile } from "../aggregate/entities";

export class JobEntityRepository {
	constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

	findAll(): Promise<Job[]> {
		return this.jobRepository.find();
	}

	findById(id: string): Promise<Job> {
		return this.jobRepository.findOne({ id: id });
	}

	findByIdAndProfile(id: string, profile: Profile): Promise<Job> {
		return this.jobRepository
			.createQueryBuilder("job")
			.where("job.saved_by_value = profile and job.id = id", { profile: profile, id: id })
			.getOne();
	}

	delete(id: string): Promise<any> {
		return this.jobRepository.delete(id);
	}
}

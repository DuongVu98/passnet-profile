import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "../aggregate/entities";
import { ClassroomId } from "../aggregate/value-objects";

@Injectable()
export class ClassroomEntityRepository {
	constructor(@InjectRepository(Classroom) private readonly classroomRepository: Repository<Classroom>) {}

	findAll(): Promise<Classroom[]> {
		return this.classroomRepository.find();
	}

	findById(id: string): Promise<Classroom> {
		return this.classroomRepository.findOne({ id: id });
	}

	findByClassroomId(classroomId: ClassroomId): Promise<Classroom> {
		return this.classroomRepository
			.createQueryBuilder("classroom")
			.where("classroom.classroom_id_value = classroomId", { classroomId: classroomId.value })
			.getOne();
	}

	delete(id: string): Promise<any> {
		return this.classroomRepository.delete(id);
	}
}

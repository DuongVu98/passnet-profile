import { Injectable } from "@nestjs/common";
import { BaseCompensating, CreateProfileCompensating } from "src/app/domain/commands/compensating";
import { CompensatingNotCompatible } from "src/app/domain/exception/exceptions";
import { ProfileEntityRepository } from "src/app/domain/repository/profile.repository";
import { CompensatingHandler } from "../command-executor/command.executor";
import { CreateProfileCommandExecutor } from "../command-executor/create-profile.executor";

@Injectable()
export class CompensatingHandlerFactory {
	constructor(private profileRepository: ProfileEntityRepository) {}

	produce(compensating: BaseCompensating): CompensatingHandler {
		if (compensating instanceof CreateProfileCompensating) {
			return this.produceCreateProfileCompensating();
		} else {
			throw new CompensatingNotCompatible();
		}
	}

	private produceCreateProfileCompensating(): CompensatingHandler {
		return new CreateProfileCommandExecutor(this.profileRepository);
	}
}

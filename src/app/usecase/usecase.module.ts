import { Module } from "@nestjs/common";
import { UuidGenerateService } from "./services/uuid-generate.service";

@Module({
	providers: [UuidGenerateService],
})
export class UsecaseModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./aggregate/entities";

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
})
export class DomainModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./app/domain/domain.module";
import { UsecaseModule } from "./app/usecase/usecase.module";
import { AdapterModule } from "./app/adapter/adapter.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Experience, Profile } from "./app/domain/aggregate/entities";
import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";
import { snakeCase } from "lodash";

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
	columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
		return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
	}
}

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "passnet_profile_app",
			password: "tungduong98",
			database: "passnet_profile_db",
			entities: [Profile, Classroom, Experience],
			synchronize: true,
			namingStrategy: new CustomNamingStrategy(),
		}),
		DomainModule,
		UsecaseModule,
		AdapterModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

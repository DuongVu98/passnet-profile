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
import { AppConfigModule } from './app/config/config.module';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
	columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
		return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
	}
}
console.debug(`debug: db host - ${process.env.DATABASE_MYSQL_HOST}`)
console.debug(`debug: db port - ${process.env.DATABASE_MYSQL_PORT}`)
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DATABASE_MYSQL_HOST,
			port: parseInt(process.env.DATABASE_MYSQL_PORT, 10) || 3306,
			username: process.env.DATABASE_MYSQL_USERNAME,
			password: process.env.DATABASE_MYSQL_PASSWORD,
			database: process.env.DATABASE_MYSQL_DBNAME,
			entities: [Profile, Classroom, Experience],
			synchronize: true,
			namingStrategy: new CustomNamingStrategy(),
            keepConnectionAlive: true
		}),
		DomainModule,
		UsecaseModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

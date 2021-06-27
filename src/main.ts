import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";

const port = process.env.SERVER_PORT_LISTENER;

const grpcOptions = {
	transport: Transport.GRPC,
	options: {
		url: process.env.GRPC_OPTION_URL,
		package: process.env.GRPC_OPTION_PACKAGE,
		protoPath: join(__dirname, process.env.PROTOBUF_CONSUME_EVENTS_PATH),
	},
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	console.log(`server port: ${port}`);

	const grpcApp = await NestFactory.createMicroservice(AppModule, grpcOptions);

	await app.listen(3000);
	grpcApp.listen(() => console.log(`env: ${process.env.NODE_ENV}`));
}
bootstrap();

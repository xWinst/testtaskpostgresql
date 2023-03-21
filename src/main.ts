import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";

const { PORT = 4000 } = process.env;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle("JS BACKEND TASK")
        .setDescription(
            "API documentation for test task <a href=https://github.com/xWinst/testtaskpostgresql>Backend</a>"
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api-docs", app, document);
    await app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}
bootstrap();

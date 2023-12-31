import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( // validator 설정
      new ValidationPipe({
        whitelist: true,
      })
  );
  app.enableCors()
  await app.listen(3021);
}
bootstrap();

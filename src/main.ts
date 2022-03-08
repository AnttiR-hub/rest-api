import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


/*
Tässä työssä on tehty REST-API käyttäen MongoDB ja nestjs.
Datan käsittelyn koodissa (CRUD) on hyödynnetty alla olevaa tutoriaalia
https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165

*/
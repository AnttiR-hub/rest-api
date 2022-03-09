import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Käynnistetään sovellus porttiin 300
  await app.listen(3000);
}
bootstrap();


/*
Tässä työssä on tehty REST-API käyttäen MongoDB ja nestjs.
Työssä käytetty data esittää yksinkertaista pankintietokantaa ja löytyy MongoDB Atlas -pilvipalvelusta.
Käytettyjä dependencieitä ovat mm. mongoose, passport, jsonwebtoken ja bcrypt

Datan käsittelyn koodissa (CRUD-toiminnot) on hyödynnetty alla olevaa tutoriaalia
https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165

REST-APIn suojausta tehdessä olen käyttänyt ja soveltanut alla olevaa tutoriaalia ja sen koodia
https://mohaned-benmansour.medium.com/jwt-authentication-using-node-nestjs-mongoose-passport-ionic5-part1-bd07becc7a52

*/
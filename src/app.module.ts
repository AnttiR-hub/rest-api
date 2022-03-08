import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//otetaan Mongoosen käyttöä varten module käyttöön
import { MongooseModule } from '@nestjs/mongoose';
import { AccModule } from './acc/acc.module';
//ConfigModule tarvitaan .env -tiedoston käyttöä varten
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //otetaan yhteys tietokantaan, joka sijaitsee MongoDB Atlas -pilvipalvelussa
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
     AccModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

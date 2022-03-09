import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../dto/user.dto';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/dto/payload';


@Injectable()
export class UserService {

    constructor(
        //injektoidaan User malli
        @InjectModel('User') private userModel: Model<User>,
      ) {}
    

      //luodaan käyttäjä ja talletetaan se tietokantaan käyttäen rekisteröinti DTO:ta
      async create(registerDTO: RegisterDTO) {
        const { email } = registerDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(registerDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
      }

      //metodi kirjautumista varten käyttäen login DTO:ta
      async findByLogin(UserDTO: LoginDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
        }
        //tarkistetaan, että kryptattu salasana täsmää
        if (await bcrypt.compare(password, user.password)) {
          return this.sanitizeUser(user)
        } else {
          throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
        }
      }
   // palauttaa käyttäjän ilman salasanaa
      sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
      }

      //tarkistetaan löytyykö annetulla payloadilla (email) käyttäjää
      async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
      }
}
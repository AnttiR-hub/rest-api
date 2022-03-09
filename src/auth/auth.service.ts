import { Injectable } from '@nestjs/common';
import { Payload } from '../dto/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  //injektoidaan UserService
  constructor(private userService: UserService) {}
  
  async signPayload(payload: Payload) {
    //luodaan tokeni ja määritellään milloin se vanhentuu, secret key tulee .env -tiedostosta
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
 
  // tarkistetaan löytyykö käyttäjä
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
import { Body, Controller, Post,} from '@nestjs/common';
import { RegisterDTO } from '../dto/register.dto';
//importoidaan UserService, jotta siellä määriteltyjä metodeja voidaan käyttää
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        //injektoidaan user- ja authServicet
        private userService: UserService,
        private authService: AuthService,
        
      ) {}

    //rekisteröidään käyttäjä hyödyntäen rekisteröinti DTO:ta
    //localhost:3000/auth/register
    @Post('register')
    //rekisteröitävän käyttäjän tiedot (email ja password) menevät requestin body osaan
    async register(@Body() registerDTO: RegisterDTO) {
      const user = await this.userService.create(registerDTO);
      const payload = {
      
        email: user.email,
      };
      //luodaan tokeni authSeriven signPayload -metodilla ja palautetaan käyttäjä ja tokeni
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }

    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      const user = await this.userService.findByLogin(loginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }

    
}
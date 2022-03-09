import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';


// Tässä tehdään valtuuttamista varten jwt strategia
@Injectable()
//passport tarkistaa JWT:n signaturen ja avaa JSONin
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      //otetaan tokeni talteen requestin headerista
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  // tarkistetaan että vastaanotettu tokeni on validi
  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
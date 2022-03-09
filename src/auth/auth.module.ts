import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  //injektoidaan jwt strategia
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule]
})
export class AuthModule {}

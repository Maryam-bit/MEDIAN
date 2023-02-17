import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  signup(authDto: AuthDto) {
    return 'signup route';
  }
  signin(authDto: AuthDto) {
    return 'signin route';
  }
}

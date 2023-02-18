import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  signup(authDto: AuthDto) {
    return 'This action adds a new auth';
  }

  signin(authDto: AuthDto) {
    return `This action returns all auth`;
  }
}

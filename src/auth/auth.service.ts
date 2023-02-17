import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(authDto: AuthDto) {
    return 'signup route';
    //   const user = await this.prisma.user.create({
    //     data: {
    //       email: authDto.email,
    //       password: authDto.password,
    //     },
    //   });
    //   return user;
  }
  signin(authDto: AuthDto) {
    return 'signin route';
  }
}

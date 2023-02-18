import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password
    const hash = await argon.hash(dto.password);
    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      // remove password from response
      delete user.password;
      // return the saved user
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        // catching prisma related error <> duplicate field in our case
        if (error.code === 'P2002') {
          throw new ForbiddenException('Crendentials taken');
        }
      }
      throw error;
    }
  }

  signin(dto: AuthDto) {
    return `This action returns all auth`;
  }
}

import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
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

  async signin(dto: AuthDto) {
    // find the user by email\
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // throw exception if user doesn't exists
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // send user back
    delete user.password;
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId, // sub is a standard/convention of JWT used for unique identifier
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret, // secret is mandatory, otherwise we can't really signin
    });
    return {
      access_token: token,
    };
  }
}

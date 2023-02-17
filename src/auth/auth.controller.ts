import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post()
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}

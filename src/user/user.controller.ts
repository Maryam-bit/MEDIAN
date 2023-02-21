import { EditUserDto } from './dto/edit-user.dto';
import { User } from '@prisma/client';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';

@ApiTags('user')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}

import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty({ default: 'johndoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: '123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, default: 'John Doe' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ required: false, default: 'john' })
  @IsString()
  @IsOptional()
  userNmae: string;
}

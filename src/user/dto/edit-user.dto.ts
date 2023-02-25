import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class EditUserDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userName: string;
}

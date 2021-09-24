import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @IsString()
  nick_name: string;

  @IsString()
  username: string;

  @IsString()
  password: string

  @IsString()
  checkPassword: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

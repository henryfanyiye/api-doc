import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  nick_name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  admin: boolean;
}

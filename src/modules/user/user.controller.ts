import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('register')
  async register(
    @Body() user: RegisterDto,
  ) {
    return this.userService.register(user);
  }

  @Post('login')
  async login(
    @Body() user: LoginDto,
  ) {
    return this.userService.login(user);
  }
}

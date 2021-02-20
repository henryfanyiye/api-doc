import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { stringToObjectId } from '../../lib/helper';

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

  @Get('detail/:id')
  async detail(
    @Param('id') id: string,
  ) {
    const user = await this.userService.detail(stringToObjectId(id));
    if (user) {
      delete user.password;
      return user;
    } else {
      throw new BadRequestException('UserId is not exist.');
    }
  }
}

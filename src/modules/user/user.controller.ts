import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorator/jwt.decorator';
import { User } from '../auth/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Public()
  @Post('register')
  async register(
    @Body() user: RegisterDto,
  ) {
    await this.userService.register(user);
    return;
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.userService.login(loginDto);
    const res = await this.authService.generateToken({ uid: user.uid });
    return res;
  }

  @Get('detail')
  async detail(
    @User() user: any,
  ) {
    let uid
    if (user) {
      uid = user.uid;
    }
    const res = await this.userService.detail(uid);
    if (res) {
      delete res.password;
      return res;
    } else {
      throw new BadRequestException('UserId is not exist.');
    }
  }

  @Get('project/list')
  async queryProjectList(
    @User() user: any,
  ) {
    const { uid } = user;
    return this.userService.queryProjectList(uid);
  }
}

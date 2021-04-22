import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { hash } from 'typeorm/util/StringUtils';

import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorator/auth.decorator';
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
    loginDto.password = hash(loginDto.password);
    const user = await this.userService.login(loginDto);
    const res = await this.authService.generateToken({ member_id: user.member_id });
    return res;
  }

  @Get('detail')
  async detail(
    @User() user: any,
  ) {
    console.log(user);
    const res = await this.userService.detail(user.member_id);
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
    @Query('is_delete') id_delete?: boolean,
  ) {
    return this.userService.queryProjectList(user.member_id, id_delete);
  }

  @Post('password/check')
  async checkPassword(
    @User() user: any,
    @Body() data: any,
  ) {
    const { password } = data;
    return this.userService.checkPassword(user.member_id, password);
  }
}

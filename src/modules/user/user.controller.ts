import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { objectIdToString, stringToObjectId } from '../../lib/helper';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Public } from '../auth/decorator/jwt.decorator';

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
    return this.userService.register(user);
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.userService.login(loginDto);
    const res = await this.authService.createToken({ id: objectIdToString(user._id) });
    return res;
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

import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DetailDto } from './dto/detail.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {
  }

  async register(user: RegisterDto): Promise<User> {
    const res = await this.userRepository.findOne({ username: user.username });
    if (res) {
      throw new BadRequestException('Username is exist.');
    } else {
      const data = await this.userRepository.save(user);
      return data;
    }
  }

  async login(user: LoginDto): Promise<User> {
    const res = await this.userRepository.findOne(user);
    if (res) {
      return res;
    } else {
      throw new BadRequestException('Username or password error.');
    }
  }

  async detail(userId: any): Promise<DetailDto> {
    const res = await this.userRepository.findOne(userId);
    if (res) {
      return res;
    } else {
      throw new BadRequestException('UserId is not exist.');
    }
  }
}

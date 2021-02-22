import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserQueryModel } from './models/userQuery.model';
import { CustomErrorException } from '../../lib/error/custom-error.exception';
import { CustomError } from '../../lib/error/custom.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'sqlite')
    private readonly userRepository: Repository<User>,
  ) {
  }

  async register(user: RegisterDto) {
    try {
      const create_time = moment().format('YYYY-MM-DD HH:mm:SS');
      user.nick_name = user.nick_name || user.username;
      return await this.userRepository.insert(Object.assign({ create_time, update_time: create_time }, user));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(user: LoginDto): Promise<User> {
    const res = await this.userRepository.findOne(user);
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.UserNameOrPasswordError);
    }
  }

  async find(query: UserQueryModel): Promise<User[]> {
    return await this.userRepository.find({ where: query });
  }

  async detail(id: any): Promise<User> {
    const res = await this.userRepository.findOne(id);
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.InvalidUserId);
    }
  }
}

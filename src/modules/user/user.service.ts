import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserQueryModel } from './models/userQuery.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'sqlite')
    private readonly userRepository: Repository<User>,
  ) {
  }

  async register(user: RegisterDto) {
    const res = await this.userRepository.findOne({ username: user.username });
    if (res) {
      throw new BadRequestException('Username is exist.');
    } else {
      const create_time = moment().format('YYYY-MM-DD HH:mm:SS');
      return await this.userRepository.insert(Object.assign({ create_time, update_time: create_time }, user));
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

  async find(query: UserQueryModel): Promise<User[]> {
    return await this.userRepository.find({ where: query });
  }

  async detail(id: any): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}

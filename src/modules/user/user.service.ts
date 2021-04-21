import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';
import { customAlphabet } from 'nanoid/async';

import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CustomErrorException } from '../../lib/error/custom-error.exception';
import { CustomError } from '../../lib/error/custom.error';
import { Project } from '../project/entity/project.entity';
import { UserProject } from './entity/user-project.entity';
import { hash } from 'typeorm/util/StringUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'sqlite')
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProject, 'sqlite')
    private readonly userProjectRepository: Repository<UserProject>,
    @InjectRepository(Project, 'sqlite')
    private readonly projectRepository: Repository<Project>,
  ) {
  }

  async register(user: RegisterDto) {
    try {
      const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      user.nick_name = user.nick_name || user.username;
      user.password = hash(user.password);
      const nanoid = customAlphabet('1234567890QWERTYUIOPASDFGHJKLZXCVBNM', 10);
      return await this.userRepository.insert(Object.assign({
        member_id: 'M_' + await nanoid(),
        create_time,
        update_time: create_time,
      }, user));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(user: LoginDto): Promise<User> {
    const res = await this.userRepository.findOne(user);
    if (res) {
      await this.userRepository.update(res.id, { last_login_time: moment().format('YYYY-MM-DD HH:mm:ss') });
      return res;
    } else {
      throw new CustomErrorException(CustomError.UserNameOrPasswordError);
    }
  }

  async detail(member_id: string): Promise<User> {
    const res = await this.userRepository.findOne({ member_id });
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.InvalidUserId);
    }
  }

  async query(data: any): Promise<User> {
    const res = await this.userRepository.findOne(data);
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.NoUserExist);
    }
  }

  async queryProjectList(member_id: number): Promise<any> {
    let res = await this.userProjectRepository.createQueryBuilder('user_project')
      .leftJoinAndSelect(Project, 'project', 'user_project.pid=project.pid')
      .select([
        'project.pid as projectId',
        'project.project_name as projectName',
        'project.description as description',
        'user_project.creator as creator',
      ])
      .where('user_project.uid = :uid', { member_id })
      .getRawMany();
    for (let i in res) {
      res[i].creator = res[i].creator === '0' ? false : true;
    }
    return res;
  }

  async checkPassword(member_id: string, password: string): Promise<boolean> {
    const res = await this.userRepository.findOne({ member_id });
    if (res) {
      if (res.password === password) {
        return;
      } else {
        throw new CustomErrorException(CustomError.PasswordError);
      }
    } else {
      throw new CustomErrorException(CustomError.InvalidUserId);
    }
  }
}

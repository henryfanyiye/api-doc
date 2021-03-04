import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CustomErrorException } from '../../lib/error/custom-error.exception';
import { CustomError } from '../../lib/error/custom.error';
import { Project } from '../project/entity/project.entity';
import { UserProject } from './entity/user-project.entity';

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

  async detail(id: any): Promise<User> {
    const res = await this.userRepository.findOne(id);
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.InvalidUserId);
    }
  }

  async queryProjectList(uid: number): Promise<any> {
    let res = await this.userProjectRepository.createQueryBuilder('user_project')
      .leftJoinAndSelect(Project, 'project', 'user_project.pid=project.pid')
      .select([
        'project.pid as projectId',
        'project.project_name as projectName',
        'project.description as description',
        'project.is_private as is_private',
        'user_project.creator as creator',
      ])
      .where('user_project.uid = :uid', { uid })
      .getRawMany();
    for (let i in res) {
      res[i].creator = res[i].creator === '0' ? false : true;
      res[i].is_private = res[i].is_private === '0' ? false : true;
    }
    return res;
  }
}

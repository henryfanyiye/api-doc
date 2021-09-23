import { Injectable } from '@nestjs/common';
import { UserEnvironment } from '../user/entity/user-environment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Environment } from './entity/environment.entity';
import { EnvironmentDto } from './dto/environment.dto';
import { copyjson } from '../../lib/helper';

@Injectable()
export class EnvironmentService {
  constructor(
    @InjectRepository(UserEnvironment, 'sqlite')
    private readonly userEnvironment: Repository<UserEnvironment>,
    @InjectRepository(Environment, 'sqlite')
    private readonly environment: Repository<Environment>
  ) {
  }

  async list(member_id: string, is_delete = false): Promise<any> {
    return await this.userEnvironment.createQueryBuilder('user_environment')
      .leftJoinAndSelect(Environment, 'environment', 'user_environment.env_id=environment.id')
      .select([
        'environment.id as id',
        'environment.env_name as name',
        'environment.env_value as value'
      ])
      .where('user_environment.is_delete=0 and user_environment.member_id = :member_id', {
        member_id
      })
      .getRawMany();
  }

  async detail(id: number): Promise<any> {
    return await this.environment.findOne(id);
  }

  async create(member_id: string, data: EnvironmentDto): Promise<any> {
    let res = copyjson(data);
    res.env_value = JSON.stringify(res.env_value);
    const { raw } = await this.environment.insert(res);
    await this.userEnvironment.insert({ member_id, env_id: raw, is_delete: false });
    return raw;
  }

  async update(data: EnvironmentDto): Promise<any> {
    let res = copyjson(data);
    res.env_value = JSON.stringify(res.env_value);
    return await this.userEnvironment.update(data.id, res);
  }

  async delete(id: number): Promise<any> {
    await this.userEnvironment.delete({ env_id: id });
    await this.environment.delete(id);
    return;
  }
}

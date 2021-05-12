import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectCatalog } from './entity/project-catalog.entity';
import { ProjectItem } from './entity/project-item.entity';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { Project } from './entity/project.entity';
import { UserProject } from '../user/entity/user-project.entity';
import { CustomErrorException } from '../../lib/error/custom-error.exception';
import { CustomError } from '../../lib/error/custom.error';
import { UserService } from '../user/user.service';
import { hash } from 'typeorm/util/StringUtils';
import { UpdateProjectItemDto } from './dto/update-project-item.dto';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project, 'sqlite') private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectCatalog, 'sqlite') private readonly catalogRepository: Repository<ProjectCatalog>,
    @InjectRepository(ProjectItem, 'sqlite') private readonly itemRepository: Repository<ProjectItem>,
    @InjectRepository(UserProject, 'sqlite') private readonly userProjectRepository: Repository<UserProject>,
    private readonly userService: UserService,
  ) {
  }

  async createProject(member_id: string, input: CreateProjectDto): Promise<any> {
    if (input.password) {
      input.password = hash(input.password);
    } else {
      const { password } = await this.userService.detail(member_id);
      input.password = password;
    }
    const { raw } = await this.projectRepository.insert(Object.assign({ is_delete: false }, input));
    await this.userProjectRepository.insert({ member_id, project_id: raw, creator: true, is_delete: false });
    return raw;
  }

  async queryProject(project_id: number): Promise<any> {
    // 查询项目下未删除目录
    let res = await this.catalogRepository.query('SELECT catalog_id as id,catalog_name as name,parentId,level,\'catalog\' AS type FROM project_catalog WHERE is_delete=0 AND project_id=:project_id', [project_id]);
    if (res.length > 0) {
      let data = [];
      // 查询目录下未删除api
      await Promise.all(
        res.map(async item => {
          const items = await this.itemRepository.query('SELECT item_id AS id,title AS name,\'api\' AS type FROM project_item WHERE is_delete=0 AND catalog_id=:catalog_id', [item.id]);
          item['items'] = items;
          item['type'] = 'catalog';
          data.push(item);
          return;
        }),
      );
      // 多层目录嵌套
      data.forEach(item1 => {
        const result = data.filter(item2 => item2.parentId === item1.id);
        item1.items = item1.items.concat(result);
      });
      // 过滤非一级目录
      data = data.filter(item => item.parentId === 0);
      // 查询项目未归入目录的api
      const items = await this.itemRepository.query('SELECT item_id AS id,title AS name,\'api\' AS type FROM project_item WHERE is_delete=0 AND catalog_id=0 AND project_id=:project_id', [project_id]);
      data = data.concat(items);
      return data;
    } else {
      return [];
    }
  }

  async updateProject(project_id: number, input: CreateProjectDto): Promise<any> {
    if (input.password) {
      input.password = hash(input.password);
    }
    await this.projectRepository.update({ project_id }, input);
    if (input.creator) {
      await this.userProjectRepository.update({ project_id }, input);
    }
    return;
  }

  async deleteProject(project_id: number): Promise<any> {
    await this.userProjectRepository.update({ project_id }, { is_delete: true });
    await this.projectRepository.update(project_id, { is_delete: true });
    await this.catalogRepository.update({ project_id }, { is_delete: true });
    await this.itemRepository.update({ project_id }, { is_delete: true });
    return;
  }

  /**
   * 转让项目
   * 1. 需要校验登录密码
   * 2. 校验转让的人是否存在
   * 3. 更新项目与用户关系
   */
  async transferProject(member_id: string, password: string, project_id: number, username: string): Promise<any> {
    // 检查用户密码
    await this.userService.query({ member_id, password: hash(password) });

    // 查询转让人是否存在
    const res = await this.userService.query({ username });
    if (res) {
      const project = await this.userProjectRepository.findOne({ member_id, project_id });
      if (project) {
        await this.userProjectRepository.update(project.id, { creator: true });
      } else {
        await this.userProjectRepository.insert({ member_id, project_id, creator: true });
      }
      await this.userProjectRepository.delete({ member_id, project_id });
      return;
    } else {
      throw new CustomErrorException(CustomError.NoUserExist);
    }
  }

  async createCatalog(input: CreateProjectCatalogDto): Promise<any> {
    const { raw } = await this.catalogRepository.insert(input);
    return { catalog_id: raw };
  }

  async updateCatalog(catalog_id: number, input: CreateProjectCatalogDto): Promise<void> {
    await this.catalogRepository.update({ catalog_id }, input);
    return;
  }

  async deleteCatalog(catalog_id: number): Promise<void> {
    await this.catalogRepository.update(catalog_id, { is_delete: true });
    await this.itemRepository.update({ catalog_id }, { is_delete: true });
    return;
  }

  async createItem(input: CreateProjectItemDto): Promise<InsertResult> {
    return await this.itemRepository.insert(input);
  }

  async queryItem(id: number): Promise<any> {
    const res = await this.itemRepository.findOne(id);
    if (res) {
      return res;
    } else {
      throw new CustomErrorException(CustomError.InvalidItemId);
    }
  }

  async updateItem(id: number, input: UpdateProjectItemDto): Promise<any> {
    return await this.itemRepository.update(id, input);
  }

  async deleteItem(id: number): Promise<any> {
    return await this.itemRepository.delete(id);
  }

  async queryProjectInfo(project_id: number) {
    const { project_name: projectName } = await this.projectRepository.findOne({ project_id });
    const catalogs = await this.catalogRepository.find({ project_id });
    const res = await Promise.all(
      catalogs.map(async item => {
        const { catalog_id, catalog_name: catalogName, parentId } = item;
        const res = await this.itemRepository.find({ catalog_id: item.catalog_id });
        return { catalog_id, catalogName, parentId, items: res };
      }),
    );
    return { project_id, projectName, catalogs: res };
  }
}

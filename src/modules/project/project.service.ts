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

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project, 'sqlite')
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectCatalog, 'sqlite')
    private readonly catalogRepository: Repository<ProjectCatalog>,
    @InjectRepository(ProjectItem, 'sqlite')
    private readonly itemRepository: Repository<ProjectItem>,
    @InjectRepository(UserProject, 'sqlite')
    private readonly userProjectRepository: Repository<UserProject>,
  ) {
  }

  async createProject(uid: number, input: CreateProjectDto): Promise<any> {
    const { raw } = await this.projectRepository.insert(input);
    await this.userProjectRepository.insert(Object.assign({ uid, pid: raw }, input));
    return raw;
  }

  async queryProject(id: number): Promise<any> {
    return await this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect(ProjectCatalog, 'project_catalog', 'project.pid=project_catalog.pid')
      .leftJoinAndSelect(ProjectItem, 'project_item', 'project_catalog.pcid=project_item.pcid')
      .select([
        'project.pid as projectId',
        'project.project_name as projectName',
        'project_catalog.pcid as catalogId',
        'project_catalog.catalog_name as catalogName',
        'project_catalog.parentId as parentId',
        'project_item.id as itemId',
        'project_item.name as itemName',
        'project_item.context as itemContext',
      ])
      .where('project.pid = :id', { id })
      .getRawMany();
  }

  async createCatalog(input: CreateProjectCatalogDto): Promise<InsertResult> {
    return await this.catalogRepository.insert(input);
  }

  async createItem(input: CreateProjectItemDto): Promise<InsertResult> {
    return await this.itemRepository.insert(input);
  }
}

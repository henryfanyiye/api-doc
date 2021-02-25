import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import fs from 'fs';

import { Project } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { ProjectCatalog } from './entity/project-catalog.entity';
import { ProjectItem } from './entity/project-item.entity';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { UserProject } from '../user/entity/user-project.entity';

@Injectable()
export class PostmanService {

  constructor(
    @InjectRepository(Project, 'sqlite')
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectCatalog, 'sqlite')
    private readonly catalogRepository: Repository<ProjectCatalog>,
    @InjectRepository(ProjectItem, 'sqlite')
    @InjectRepository(UserProject, 'sqlite')
    private readonly userProjectRepository: Repository<UserProject>,
    private readonly itemRepository: Repository<ProjectItem>,
  ) {
  }

  async createProject(uid: number, input: CreateProjectDto): Promise<number> {
    const { raw } = await this.projectRepository.insert(input);
    await this.userProjectRepository.insert({ uid, pid: raw });
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

  async mappingAndInsert(uid: number, filePath: string): Promise<any> {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { info, item } = JSON.parse(contents);
    const pid = await this.createProject(uid, { project_name: info.name, description: null });
    await this.batchInsert(pid, pid, item);
    return;
  }

  async batchInsert(pid: number, parentId: number, data): Promise<any> {
    for (const i in data) {
      const { name, item, request } = data[i];
      if (item) {
        const { raw } = await this.createCatalog({ catalog_name: name, pid, parentId });
        await this.batchInsert(pid, raw, item);
      }
      if (request) {
        await this.createItem({ name, context: JSON.stringify(request), pid, pcid: parentId });
      }
    }
    return;
  }

}

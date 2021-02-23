import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fs from 'fs';

import { Project } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { ProjectCatalog } from './entity/project-catalog.entity';
import { ProjectItem } from './entity/project-item.entity';
import { CreateProjectItemDto } from './dto/create-project-item.dto';

@Injectable()
export class PostmanService {

  constructor(
    @InjectRepository(Project, 'sqlite')
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectCatalog, 'sqlite')
    private readonly catalogRepository: Repository<ProjectCatalog>,
    @InjectRepository(ProjectItem, 'sqlite')
    private readonly itemRepository: Repository<ProjectItem>,
  ) {
  }

  async createProject(input: CreateProjectDto) {
    return await this.projectRepository.insert(input);
  }

  async queryProject(id: number): Promise<any> {
    return await this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect(ProjectCatalog, 'project_catalog', 'project.pid=project_catalog.pid')
      .leftJoinAndSelect(ProjectItem, 'project_item', 'project_catalog.pcid=project_item.pcid')
      .select(`
        project.pid as projectId,
        project.project_name as projectName,
        project_catalog.pcid as catalogId,
        project_catalog.catalog_name as catalogName,
        project_catalog.parentId as parentId,
        project_item.id as itemId,
        project_item.name as itemName,
        project_item.context as itemContext
      `)
      .andWhere('project.pid=id', { id })
      .getRawMany();
  }

  async createCatalog(input: CreateProjectCatalogDto) {
    return await this.catalogRepository.insert(input);
  }

  async createItem(input: CreateProjectItemDto) {
    return await this.itemRepository.insert(input);
  }

  async mappingAndInsert(filePath: string) {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { info, item } = JSON.parse(contents);
    const { name } = info;

    return;
    // return await async.eachLimit(data, 1, async (item, cb) => {
    //   await this.findOneAndUpdate(item);
    //   cb();
    // });

  }

}

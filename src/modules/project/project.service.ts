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

  async queryProject(pid: number): Promise<any> {
    return await this.projectRepository.findOne({ pid });
  }

  async updateProject(pid: number, input: CreateProjectDto): Promise<any> {
    await this.projectRepository.update({ pid }, input);
    if (input.creator) {
      await this.userProjectRepository.update({ pid }, input);
    }
    return;
  }

  async deleteProject(pid: number): Promise<any> {
    await this.itemRepository.delete({ pid });
    await this.userProjectRepository.delete({ pid });
    await this.catalogRepository.delete({ pid });
    await this.projectRepository.delete({ pid });
    return;
  }

  async createCatalog(input: CreateProjectCatalogDto): Promise<InsertResult> {
    return await this.catalogRepository.insert(input);
  }

  async queryCatalog(pcid: number): Promise<any> {
    return await this.catalogRepository.findOne({ pcid });
  }

  async updateCatalog(pcid: number, input: CreateProjectCatalogDto): Promise<any> {
    return await this.catalogRepository.update({ pcid }, input);
  }

  async deleteCatalog(pcid: number): Promise<any> {
    return await this.catalogRepository.delete({ pcid });
  }

  async createItem(input: CreateProjectItemDto): Promise<InsertResult> {
    return await this.itemRepository.insert(input);
  }

  async queryItem(id: number): Promise<any> {
    return await this.itemRepository.findOne({ id });
  }

  async updateItem(id: number, input: CreateProjectItemDto): Promise<any> {
    return await this.itemRepository.update({ id }, input);
  }

  async deleteItem(id: number): Promise<any> {
    return await this.itemRepository.delete({ id });
  }

  async queryProjectInfo(pid: number) {
    const { project_name: projectName } = await this.projectRepository.findOne({ pid });
    const catalogs = await this.catalogRepository.find({ pid });
    const res = await Promise.all(
      catalogs.map(async item => {
        const { pcid, catalog_name: catalogName, parentId } = item;
        const res = await this.itemRepository.find({ pcid: item.pcid });
        return { pcid, catalogName, parentId, items: res };
      }),
    );
    return { pid, projectName, catalogs: res };
  }
}

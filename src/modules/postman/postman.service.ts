import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fs from 'fs';

import { Project } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { ProjectCatalog } from './entity/project-catalog.entity';

@Injectable()
export class PostmanService {

  constructor(
    @InjectRepository(Project, 'sqlite')
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectCatalog, 'sqlite')
    private readonly catalogRepository: Repository<ProjectCatalog>,
  ) {
  }

  async createProject(input: CreateProjectDto) {
    return await this.projectRepository.insert(input);
  }

  async createCatalog(input: CreateProjectCatalogDto) {
    return await this.catalogRepository.insert(input);
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

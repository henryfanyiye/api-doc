import { Injectable } from '@nestjs/common';
import fs from 'fs';

import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { mappingFiled, filterApi } from '../../lib/helper';

@Injectable()
export class PostmanService {

  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {
  }

  async importCollection(member_id: string, filePath: string): Promise<any> {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { info, item } = JSON.parse(contents);
    const project_id = await this.projectService.createProject(member_id, {
      project_name: info.name,
      description: null,
      password: null,
      is_private: true,
      is_delete: false,
      creator: true,
    });
    await this.batchInsert(project_id, item);
    return project_id;
  }

  async batchInsert(project_id: number, data: any, parentId = 0, level = 1): Promise<void> {
    for (const i in data) {
      const { name, item, request } = data[i];
      if (item) {
        const { catalog_id } = await this.projectService.createCatalog({
          catalog_name: name,
          project_id,
          parentId,
          level,
          is_delete: false,
        });
        await this.batchInsert(project_id, item, catalog_id, level + 1);
      }
      if (request) {
        const requestMap = mappingFiled(data[i]);
        await this.projectService.createItem(Object.assign(requestMap, {
          project_id,
          catalog_id: parentId,
          is_delete: false,
        }));
      }
    }
    return;
  }

  async getApiList(filePath: string): Promise<any> {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { item } = JSON.parse(contents);
    return filterApi(item, []);
  }
}

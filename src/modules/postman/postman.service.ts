import { Injectable } from '@nestjs/common';
import fs from 'fs';

import { ProjectService } from '../project/project.service';
import { jsonToMd } from '../../lib/helper';

@Injectable()
export class PostmanService {

  constructor(
    private readonly projectService: ProjectService,
  ) {
  }

  async mappingAndInsert(uid: number, filePath: string): Promise<any> {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { info, item } = JSON.parse(contents);
    const pid = await this.projectService.createProject(uid, {
      project_name: info.name,
      description: null,
      creator: true,
      password: null,
    });
    await this.batchInsert(pid, pid, item);
    return;
  }

  async batchInsert(pid: number, parentId: number, data): Promise<any> {
    for (const i in data) {
      const { name, item, request } = data[i];
      if (item) {
        const { raw } = await this.projectService.createCatalog({ catalog_name: name, pid, parentId });
        await this.batchInsert(pid, raw, item);
      }
      if (request) {
        const context: string = jsonToMd(data[i]);
        await this.projectService.createItem({ name, context, pid, pcid: parentId });
      }
    }
    return;
  }
}

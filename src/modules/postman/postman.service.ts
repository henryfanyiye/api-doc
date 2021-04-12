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

  async getApiList(uid: number, filePath: string): Promise<any> {
    const contents: string = await fs.readFileSync(
      filePath,
      {
        encoding: 'utf8',
      },
    );
    const { item } = JSON.parse(contents);
    return await this.filterApi(item, []);
  }

  async filterApi(data: any, api) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].request) {
        let raw = data[i].request.url.raw.split('}}')[1];
        raw = raw.split('?')[0];
        api.push(`${data[i].name},${raw}`);
      }
      if (data[i].item) {
        await this.filterApi(data[i].item, api);
      }
    }
    return api;
  }
}

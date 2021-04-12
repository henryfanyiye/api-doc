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
        const raw = data[i].request.url.raw.split('/');
        let str = '';
        for (let j = 1; j < raw.length; j++) {
          str += raw[j];
        }
        str = str.split('?')[0];
        api.push(`${data[i].name},${str}`);
      }
      if (data[i].item) {
        api.push(data[i].name);
        await this.filterApi(data[i].item, api);
      }
    }
    return api;
  }
}

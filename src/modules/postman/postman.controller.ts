import { Body, Controller, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as async from 'async';

import { PostmanService } from './postman.service';

import { filterRequest } from '../../lib/helper';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
  ) {
  }

  @Post('jsonToMd')
  async jsonToMd(@Body() data: any) {
    const contents: string = await fs.readFileSync(
      './fileUpload/Github.postman_collection.json',
      {
        encoding: 'utf8',
      },
    );
    const { info, item } = JSON.parse(contents);
    const { name } = info;
    return filterRequest([name], [], item);
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
    const data = filterRequest([name], [], item);

    return await async.eachLimit(data, 1, async (item, cb) => {
      await this.postmanService.findOneAndUpdate(item);
      cb();
    });

  }
}

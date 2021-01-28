import { Body, Controller, Post } from '@nestjs/common';
import * as fs from 'fs';

@Controller('postman')
export class PostmanController {
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
    const req = filterRequest([name], [], item);
    return req;
  }
}

function filterRequest(dir: Array<string>, data: Array<any>, item: Array<any>) {
  for (const i in item) {
    if (item[i].request) {
      data.push(Object.assign({ dir }, mappingFiled(item[i])));
    }
    if (item[i].item) {
      const dirN = [...dir];
      dirN.push(item[i].name);
      filterRequest(dirN, data, item[i].item);
    }
  }
  return data;
}

function mappingFiled(data) {
  const { name, request } = data;
  const { method, header, url, body } = request;
  const { path, variable, query } = url;
  return {
    name,
    method,
    api: spliceApi(path),
    header,
    path: variable ? variable : null,
    query: query ? query : null,
    body: body ? body[body.mode] : null,
  };
}

function spliceApi(path: any) {
  let api = '';
  for (const i in path) {
    api += `/${path[i]}`;
  }
  return api;
}

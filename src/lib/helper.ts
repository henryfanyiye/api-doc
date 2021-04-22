import { join } from 'path';
import fs from 'fs';
import { Parser } from 'json2csv';

/**
 * 拼接请求路径
 */
export function spliceApi(path: any): string {
  let api = '';
  for (const i in path) {
    api += `/${path[i]}`;
  }
  return api;
}

/**
 * format filed
 */
export function mappingFiled(data): any {
  const { name, request } = data;
  const { method, header, url, body } = request;
  const { path, variable, query } = url;
  return {
    title: name,
    method,
    url: this.spliceApi(path),
    header: header ? JSON.stringify(header) : null,
    path: variable ? JSON.stringify(variable) : null,
    query: query ? JSON.stringify(query) : null,
    body_type: body ? body.mode : null,
    body: body ? body[body.mode] : null,
  };
}

export function filterApi(data: any, api): any {
  for (let i = 0; i < data.length; i++) {
    if (data[i].item) {
      api.push({ name: data[i].name });
      this.filterApi(data[i].item, api);
    }
    if (data[i].request) {
      const raw = data[i].request.url.raw.split('/');
      let str = '';
      for (let j = 1; j < raw.length; j++) {
        str += '/' + raw[j];
      }
      if (str.indexOf('?') > -1) str = str.split('?')[0];
      api.push({ name: data[i].name, api: str });
    }
  }
  return api;
}

export async function createCsv(title: string, fields: any[], data: any) {
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(data);

  const dirPath = join(__dirname, '../../files');
  const filePath = dirPath + `/${title}`;
  await fs.promises.mkdir(dirPath, { recursive: true });
  await fs.writeFileSync(filePath, csv);

  return filePath;
}

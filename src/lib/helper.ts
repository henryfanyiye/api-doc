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

  const fileds = {
    title: name,
    method,
    url: this.spliceApi(path),
    header: header ? JSON.stringify(header) : null,
    path: variable ? JSON.stringify(variable) : null,
    query: query ? JSON.stringify(query) : null,
    body_type: body ? body.mode : null,
    body: body ? body[body.mode] : null,
    markdown: null
  };

  fileds.markdown = makeMarkdown(fileds.title, fileds.method, fileds.url, header, variable, query, fileds.body_type, fileds.body);

  return fileds;
}

export function makeMarkdown(title: string, method: string, url: string, header = [], path = [], query = [], body_type?: any, body?: any): string {
  // Title
  let content = `# ${title}\n\n` +
    `**Method：** \`${method}\`\n\n` +
    `**Path：** \`${url}\`\n\n` +
    `**Description：**\n\n`;

  let reqParams = '';
  // Header
  if (header.length > 0) {
    for (const i in header) {
      reqParams += `|${header[i].key}|header|string|${header[i].value}|Y|\n`;
    }
  }

  // Path
  if (path.length > 0) {
    for (const i in path) {
      reqParams += `|${path[i].key}|path|string|${path[i].value}|Y|\n`;
    }
  }

  // Query
  if (query.length > 0) {
    for (const i in query) {
      reqParams += `|${query[i].key}|query|string|${query[i].value}|Y|\n`;
    }
  }

  // Request Params
  if (reqParams) {
    content += `**Request Parameters：**\n\n` +
      '|Name|Type|Data Type|Description|Required|\n' +
      '|--|--|--|--|--|\n' +
      `${reqParams}\n`;
  }

  // Request Body
  if (body) {
    content += '**Request Sample：**\n\n' +
      '```json\n' +
      `${body}\n` +
      '```\n';
  }

  // Response
  content += '**Response Sample：**\n\n' +
    '```json\n' +
    '{ success: true}\n' +
    '```\n';

  // Error
  content += '**Error Code：**\n\n' +
    '|Status|Code|Message|\n' +
    '|--|--|--|\n' +
    '|500|500|Internet Server Error|\n\n';

  // Sequence
  content += '**Sequence Diagram：**\n\n' +
    '```mermaid\n' +
    'sequenceDiagram\n' +
    '    A ->> B : Demo\n' +
    '```';

  return content;
}

export function filterApi(data: any, api): any {
  for (let i = 0; i < data.length; i++) {
    if (data[i].item) {
      api.push({ name: data[i].name });
      this.filterApi(data[i].item, api);
    }
    if (data[i].request) {
      // const raw = data[i].request.url.raw.split('/');
      // let str = '';
      // for (let j = 1; j < raw.length; j++) {
      //   str += '/' + raw[j];
      // }
      // if (str.indexOf('?') > -1) str = str.split('?')[0];
      api.push({ name: data[i].name, api: this.spliceApi(data[i].request.path) });
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

export function copyjson(data) {
  const res = JSON.stringify(data);
  return JSON.parse(res);
}

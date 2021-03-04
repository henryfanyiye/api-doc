/**
 * 逐层解析postman.json，提取api
 */
export function filterRequest(dir: Array<string>, data: Array<any>, item: Array<any>) {
  for (const i in item) {
    if (item[i].request) {
      data.push(Object.assign({ dir }, this.mappingFiled(item[i])));
    }
    if (item[i].item) {
      const dirN = [...dir];
      dirN.push(item[i].name);
      this.filterRequest(dirN, data, item[i].item);
    }
  }
  return data;
}

/**
 * format filed
 */
export function mappingFiled(data) {
  const { name, request } = data;
  const { method, header, url, body } = request;
  const { path, variable, query } = url;
  return {
    name,
    method,
    api: this.spliceApi(path),
    header,
    path: variable ? variable : null,
    query: query ? query : null,
    body: body ? body[body.mode] : null,
  };
}

/**
 * 拼接请求路径
 */
export function spliceApi(path: any) {
  let api = '';
  for (const i in path) {
    api += `/${path[i]}`;
  }
  return api;
}

export function jsonToMd(data: any): string {
  const { name, method, api, header, path, query, body } = this.mappingFiled(data);
  const tmp1 = `# ${method} ${api}\n\n**Description** : ${name}\n\n`;

  let tmp2 = '### Request\n\n' +
    '| Name             | Required | Type   | Data Type |    Demo     | Description |\n' +
    '|------------------|----------|--------|-----------|-------------|-------------|\n';

  const request = { header, path, query };
  for (let i in request) {
    if (request[i] && request[i].length > 0) {
      for (let j in request[i]) {
        tmp2 += `|${request[i][j].key}|true|${i}|${request[i][j].type}|${request[i][j].value || 'string'}|${request[i][j].description || ''}|\n`;
      }
    }
  }

  const tmp3 = '\n**Request sample**\n\n' +
    '```json\n' +
    `${body}\n` +
    '```\n\n' +
    '### Response\n\n' +
    '**Success response**\n\n' +
    '```json\n{}\n```\n\n' +
    '| Name | Data Type | Description |\n' +
    '|------|-----------|-------------|\n' +
    '|      |           |             |\n' +
    '\n**Failed response**\n\n' +
    '```json\n{}\n```\n\n' +
    '**Code**\n\n' +
    '| Code | Message |\n' +
    '|------|---------|\n' +
    '|      |         |\n' +
    '\n**Sequence**\n\n' +
    '```plantuml\nA -> B : \n```';

  return tmp1 + tmp2 + tmp3;
}

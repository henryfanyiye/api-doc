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

export function filterCatalog(catalog: Array<any>, index: any, data: any) {
  for (const i in data) {
    if (data[i].item) {
      catalog.push(data[i].name);
      this.filterCatalog(catalog, index, data[i].item);
    }
    if (data[i].request) {
      catalog.push(data[i].request);
    }
  }
  return catalog;
}

export function filterItem(catalog: Array<any>, index: any, data: any) {
  for (const i in data) {
    if (data[i].item) {
      catalog.push(data[i].name);
      this.filterCatalog(catalog, index, data[i].item);
    }
  }
  return catalog;
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

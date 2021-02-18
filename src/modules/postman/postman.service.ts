import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as async from 'async';

import { QuerySchema } from './models/query.model';
import { InputSchema } from './models/input.model';
import { Postman } from './postman.entity';
import fs from 'fs';
import { filterRequest } from '../../lib/helper';

@Injectable()
export class PostmanService {

  constructor(
    @InjectRepository(Postman)
    private readonly postmanRepository: MongoRepository<Postman>,
  ) {
  }

  async count(query: QuerySchema) {
    return await this.postmanRepository.count(query);
  }

  async find(query: QuerySchema, skip: number, limit: number): Promise<Postman[]> {
    return await this.postmanRepository.find({ where: query, skip, take: limit });
  }

  async create(input: InputSchema): Promise<Postman> {
    return this.postmanRepository.save(input);
  }

  async findOneAndUpdate(input) {
    const res = await this.postmanRepository.find({
      dir: input.dir,
      name: input.name,
      method: input.method,
      api: input.api,
    });
    if (res.length > 0) {
      return await this.postmanRepository.update(res[0]._id, input);
    } else {
      return await this.postmanRepository.save(input);
    }
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
      await this.findOneAndUpdate(item);
      cb();
    });

  }

}

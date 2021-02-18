import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { QuerySchema } from './models/query.model';
import { InputSchema } from './models/input.model';
import { Postman } from './postman.entity';

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

  async find(query: QuerySchema, skip: number, limit: number) {
    return await this.postmanRepository.find({ where: query, skip, take: limit });
  }

  async create(input: InputSchema): Promise<Postman> {
    return this.postmanRepository.save(Object.assign({ _id: uuidv4() }, input));
  }
}

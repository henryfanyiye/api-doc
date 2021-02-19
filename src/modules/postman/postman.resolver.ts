import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

import { QueryModel } from './models/query.model';
import { CreateModel } from './models/create.model';
import { DocModel } from './models/doc.model';
import { QueryOutSchema } from './models/queryOut.model';
import { PostmanService } from './postman.service';
import { stringToObjectId } from '../../lib/helper';

@Resolver(() => DocModel)
export class PostmanResolver {
  constructor(private readonly postmanService: PostmanService) {
  }

  @Query(() => [QueryOutSchema])
  async find(@Args('query') query: QueryModel) {
    const { _id, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    let arg: any;

    delete query.page;
    delete query.limit;

    if (_id) {
      const id = stringToObjectId(_id);
      delete query._id;
      arg = Object.assign({ _id: id }, query);
    } else {
      arg = query;
    }

    const count = await this.postmanService.count(arg);

    const data = await this.postmanService.find(arg, skip, limit);
    return [{ count, page, limit, data }];
  }

  @Mutation(() => DocModel)
  async create(@Args('apiDoc') apiDoc: CreateModel) {
    return await this.postmanService.create(apiDoc);
  }
}

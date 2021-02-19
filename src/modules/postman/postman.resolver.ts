import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ApiQueryModel } from './models/apiQuery.model';
import { CreateModel } from './models/create.model';
import { ApiModel } from './models/api.model';
import { ApisModel } from './models/apis.model';
import { PostmanService } from './postman.service';
import { stringToObjectId } from '../../lib/helper';

@Resolver(() => ApiModel)
export class PostmanResolver {
  constructor(
    private readonly postmanService: PostmanService,
  ) {
  }

  @Query(() => [ApisModel])
  async findAPI(@Args('query') query: ApiQueryModel) {
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

  @Mutation(() => ApiModel)
  async create(@Args('apiDoc') apiDoc: CreateModel) {
    return await this.postmanService.create(apiDoc);
  }
}

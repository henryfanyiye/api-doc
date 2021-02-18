import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { QuerySchema } from './models/query.model';
import { InputSchema } from './models/input.model';
import { DocSchema } from './models/doc.model';
import { QueryOutSchema } from './models/queryOut.model';
import { PostmanService } from './postman.service';

@Resolver(() => DocSchema)
export class PostmanResolver {
  constructor(private readonly postmanService: PostmanService) {
  }

  @Query(() => [QueryOutSchema])
  async find(@Args('query') query: QuerySchema) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    delete query.page;
    delete query.limit;
    const count = await this.postmanService.count(query);
    const data = await this.postmanService.find(query, skip, limit);
    return [{ count, page, limit, data }];
  }

  @Mutation(() => DocSchema)
  async create(@Args('apiDoc') apiDoc: InputSchema) {
    return await this.postmanService.create(apiDoc);
  }
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { QuerySchema } from './models/query.model';
import { InputSchema } from './models/input.model';
import { OutputSchema } from './models/output.model';
import { PostmanService } from './postman.service';

@Resolver(() => OutputSchema)
export class PostmanResolver {
  constructor(private readonly postmanService: PostmanService) {
  }

  @Query(() => [OutputSchema])
  async find(@Args('query') query: QuerySchema) {
    return await this.postmanService.find(query);
  }

  @Mutation(() => OutputSchema)
  async create(@Args('apiDoc') apiDoc: InputSchema) {
    return await this.postmanService.create(apiDoc);
  }
}

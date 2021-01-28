import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { APISchema } from './models/api.model';
import { PostmanService } from './postman.service';

@Resolver((of) => APISchema)
export class PostmanResolver {
  constructor(private readonly postmanService: PostmanService) {}

  @Query((returns) => APISchema)
  async findById(@Args('id') id: number): Promise<APISchema> {
    const data = await this.postmanService.findById(id);
    if (!data) {
      throw new NotFoundException(id);
    }
    return data;
  }
}

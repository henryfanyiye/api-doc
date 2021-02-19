import { Field, ObjectType } from '@nestjs/graphql';
import { ApiModel } from './api.model';

@ObjectType()
export class ApisModel {
  @Field()
  count: number;

  @Field()
  page: number;

  @Field()
  limit: number;

  @Field(type => [ApiModel], { nullable: 'itemsAndList' })
  data: ApiModel[];
}

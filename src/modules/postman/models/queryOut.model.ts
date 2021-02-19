import { Field, ObjectType } from '@nestjs/graphql';
import { DocModel } from './doc.model';

@ObjectType()
export class QueryOutSchema {
  @Field()
  count: number;

  @Field()
  page: number;

  @Field()
  limit: number;

  @Field(type => [DocModel], { nullable: 'itemsAndList' })
  data: DocModel[];
}

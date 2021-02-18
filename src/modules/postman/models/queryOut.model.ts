import { Field, ObjectType } from '@nestjs/graphql';
import { DocSchema } from './doc.model';

@ObjectType()
export class QueryOutSchema {
  @Field()
  count: number;

  @Field()
  page: number;

  @Field()
  limit: number;

  @Field(type => [DocSchema], { nullable: 'itemsAndList' })
  data: DocSchema[];
}

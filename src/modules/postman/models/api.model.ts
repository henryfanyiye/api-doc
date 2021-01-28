import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class APISchema {
  @Field(type => ID)
  id: number;

  @Field()
  method?: string;

  @Field()
  api?: string;

  @Field()
  header?: string;

  @Field()
  path?: string;

  @Field()
  query?: string;

  @Field()
  body?: string;
}

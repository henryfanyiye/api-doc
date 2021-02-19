import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QueryModel {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  method: string;

  @Field({ nullable: true })
  api: string;

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  limit: number;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuerySchema {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  method: string;

  @Field({ nullable: true })
  api: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserQueryModel {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  email: string;
}

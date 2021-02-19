import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  email: string;
}

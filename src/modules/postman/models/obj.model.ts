import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class IObjModel {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;

  @Field({ nullable: true })
  type: string;
}

@ObjectType()
export class OObjModel {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;

  @Field({ nullable: true })
  type: string;
}

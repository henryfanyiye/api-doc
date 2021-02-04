import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class IObjModel {
  @Field()
  key?: string;

  @Field()
  value?: string;

  @Field()
  type?: string;
}

@ObjectType()
export class OObjModel {
  @Field()
  key?: string;

  @Field()
  value?: string;

  @Field()
  type?: string;
}

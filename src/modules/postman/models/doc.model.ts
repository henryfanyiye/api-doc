import { Field, ObjectType } from '@nestjs/graphql';
import { OObjModel } from './obj.model';

@ObjectType()
export class DocSchema {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  method: string;

  @Field({ nullable: true })
  api: string;

  @Field(type => [OObjModel], { nullable: 'itemsAndList' })
  header: OObjModel[];

  @Field(type => [OObjModel], { nullable: 'itemsAndList' })
  path: OObjModel[];

  @Field(type => [OObjModel], { nullable: 'itemsAndList' })
  query: OObjModel[];

  @Field({ nullable: true })
  body: string;

  @Field(type => [String], { nullable: true })
  dir: string[];
}

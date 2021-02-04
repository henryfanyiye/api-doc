import { Field, ObjectType } from '@nestjs/graphql';
import { OObjModel } from './obj.model';

@ObjectType()
export class OutputSchema {
  @Field()
  id: string;

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

  @Field(type => [OObjModel], { nullable: 'itemsAndList' })
  body: OObjModel[];
}

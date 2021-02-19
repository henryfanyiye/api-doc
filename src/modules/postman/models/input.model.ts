import { Field, InputType } from '@nestjs/graphql';
import { IObjModel } from './obj.model';

@InputType()
export class InputSchema {
  @Field()
  name: string;

  @Field()
  method: string;

  @Field()
  api: string;

  @Field(type => [IObjModel], { nullable: 'itemsAndList' })
  header: IObjModel[];

  @Field(type => [IObjModel], { nullable: 'itemsAndList' })
  path: IObjModel[];

  @Field(type => [IObjModel], { nullable: 'itemsAndList' })
  query: IObjModel[];

  @Field({ nullable: true })
  body: string;

  @Field(type => [String], { nullable: true })
  dir: string[];
}

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagModel {
  @Field( type => Int)
  tid: number;

  @Field({ nullable: true })
  tag_name: string;

  @Field( type => Int, { nullable: true })
  tag_content_num: number;
}

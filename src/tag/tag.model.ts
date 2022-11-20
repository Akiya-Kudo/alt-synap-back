import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagModel {
  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  tag_name: string;

  @Field(() => Int, { nullable: true })
  tag_content_num: number;
}

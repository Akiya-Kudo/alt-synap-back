import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post_tag {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  pid: number;

  @Field(() => Int, { nullable: true })
  tid: number;
}

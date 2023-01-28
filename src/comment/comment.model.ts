import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field(() => Int)
  cid: number;

  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  uid: string;

  @Field({ nullable: true })
  comment_content: string;
}

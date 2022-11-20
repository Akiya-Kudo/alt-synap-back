import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field(() => Int, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  uid: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  top_image_link: string;

  @Field({ nullable: true })
  top_link: string;

  @Field(() => Int, { nullable: true })
  content_type: number;

  @Field(() => Int, { nullable: true })
  likes_num: number;

  @Field({ nullable: true })
  at_time: string;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Slide_contentModel {
  @Field(() => Int, { nullable: true })
  pid: number;

  @Field(() => Int, { nullable: true })
  order_num: number;

  @Field({ nullable: true })
  YouTube_link: string;

  @Field({ nullable: true })
  pinterest_post_key: string;

  @Field({ nullable: true })
  image_link: string;

  @Field({ nullable: true })
  memo: string;
}

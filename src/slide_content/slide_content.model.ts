import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Slide_contentModel {
  @Field(() => Int)
  pid: number;

  @Field(() => Int)
  order_num: number;

  @Field({ nullable: true })
  youtube_link: string;

  @Field({ nullable: true })
  instagram_link_url: string;

  @Field({ nullable: true })
  image_url: string;

  @Field(type => Int, { nullable: true })
  slide_content_type: number;

  @Field({ nullable: true })
  memo: string;
}

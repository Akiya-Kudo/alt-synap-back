import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostTag } from '../posts_tag/posts_tag.model';
import { UserTag } from '../user_tag/user_tag.model';

@ObjectType()
export class Tag {
  @Field( type => Int, { nullable: true })
  tid?: number;

  @Field({ nullable: true })
  tag_name?: string;

  @Field({ nullable: true })
  display_name?: string;
  
  @Field({ nullable: true })
  tag_image?: string;

  @Field( type => Int, { nullable: true })
  tag_content_num?: number;

  @Field( type => [PostTag], { nullable: true })
  post_tags?: PostTag[];

  @Field(type => [UserTag], {nullable: true})
  user_tags?: UserTag[]
}
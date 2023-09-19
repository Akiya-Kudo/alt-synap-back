import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { PostTag } from 'src/posts_tag/posts_tag.model';
import { UserTag } from 'src/user_tag/user_tag.model';

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
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { Tag } from 'src/tag/tag.model';

@ObjectType()
export class PostTag {
  @Field(() => ID)
  id: number;

  @Field(() => ID, { nullable: true })
  pid: number;

  @Field(() => ID, { nullable: true })
  tid: number;

  @Field( type => Post, { nullable: true })
  posts: Post;

  @Field( type => Tag, { nullable: true })
  tags: Tag;
}

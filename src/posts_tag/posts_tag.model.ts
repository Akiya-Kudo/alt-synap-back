import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { Tag } from 'src/tag/tag.model';

@ObjectType()
export class PostTag {
  @Field(() => ID)
  uuid_pid: string;

  @Field(() => Int)
  tid: number;

  @Field( type => GraphQLISODateTime, { nullable: true })
  timestamp: Date;

  @Field( type => Post, { nullable: true })
  posts: Post;

  @Field( type => Tag, { nullable: true })
  tags: Tag;
}

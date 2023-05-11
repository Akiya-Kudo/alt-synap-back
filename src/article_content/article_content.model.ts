import { Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Post } from 'src/post/post.model';

@ObjectType()
export class ArticleContent {
  @Field(type => Int)
  pid: number;

  @Field( type => GraphQLJSONObject, { nullable: true })
  content: JSON;

  @Field( type => Post, { nullable: true })
  posts: Post;
}
import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Post } from 'src/post/post.model';

@ObjectType()
export class ArticleContent {
  @Field( type => ID )
  uuid_pid: string;

  @Field( type => GraphQLJSONObject, { nullable: true })
  content: any;

  @Field( type => Post, { nullable: true })
  posts?: Post;
}
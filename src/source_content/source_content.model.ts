import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Post } from '../post/post.model';

@ObjectType()
export class SourceContent {
  @Field( type => ID)
  uuid_pid: string;

  @Field({ nullable: true })
  source_link: string;

  @Field(type => Int, { nullable: true })
  source_type: number;

  @Field( type => GraphQLJSONObject, { nullable: true })
  description: JSON;

  @Field( type => Post, { nullable: true })
  posts: Post;
}

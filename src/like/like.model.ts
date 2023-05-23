import { Field, GraphQLISODateTime, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Like {
  @Field( type => ID )
  uuid_pid: string;

  @Field( type => ID)
  uuid_uid: string;

  @Field( type => GraphQLISODateTime, { nullable: true })
  timestamp: Date;

  @Field(type => Post, {nullable: true })
  posts: Post;

  @Field( type => User, { nullable: true })
  users: User;
}

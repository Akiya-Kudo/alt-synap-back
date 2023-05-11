import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Like {
  @Field(() => ID )
  lid: number;

  @Field(() => ID, { nullable: true })
  pid: number;

  @Field({ nullable: true })
  uid: string;

  @Field(type => Post, {nullable: true })
  posts: Post;

  @Field( type => User, { nullable: true })
  users: User;
}

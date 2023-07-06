import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/like/like.model';
import { Post } from 'src/post/post.model';

// modelでのnullableは一括してID以外にオプションとしてつけています。処理を記述していき、不具合が主じたらその度変更していきます。
// リレーションを親に子のオブジェクトの配列を持たせることで表示させます。

@ObjectType()
export class User {
  @Field( type => ID, { nullable: true })
  uid: string;

  @Field( type => ID, { nullable: true })
  uuid_uid: string;

  @Field({ nullable: true })
  user_name: string;

  @Field({ nullable: true })
  user_image: string;

  @Field({ nullable: true })
  comment: string;

  @Field( type => Int, { nullable: true})
  followee_num: number;

  @Field( type => Int, { nullable: true })
  follower_num: number;

  @Field( type => Int, { nullable: true })
  lang_type: number;

  @Field( type => [Post], { nullable: true })
  posts: Post[];

  @Field( type => [Like], { nullable: true })
  likes: Like[];
}
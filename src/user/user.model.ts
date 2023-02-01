import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

// modelでのnullableは一括してID以外にオプションとしてつけています。処理を記述していき、不具合が主じたらその度変更していきます。
// リレーションを親に子のオブジェクトの配列を持たせることで表示させます。

@ObjectType()
export class UserModel {
  @Field()
  firebase_id: string;

  @Field({ nullable: true })
  user_name: string;

  @Field({ nullable: true })
  photo_url: string;

  @Field({ nullable: true })
  comment: string;

  @Field(type => Int, {nullable: true})
  followee_num: number;

  @Field(type => Int, { nullable: true })
  follower_num: number;

  @Field( type => Int, { nullable: true })
  lang_type: number;
}

@InputType()
export class updateUserInfoInput {
  @Field()
  firebase_id: string;

  @Field({ nullable: true })
  user_name: string;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  photo_url: string;

  @Field( type => Int, { nullable: true })
  lang_type: number;
}

@InputType()
export class createUserInfoInput {
  @Field()
  firebase_id: string;

  @Field({ nullable: true })
  user_name: string;
}

import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  firebase_id: string;

  @Field({ nullable: true })
  user_name: string;

  @Field({ nullable: true })
  photo_url: string;

  @Field({ nullable: true })
  comment: string;

  @Field(type => Int)
  followee_num: number;

  @Field(type => Int)
  follower_num: number;
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
}

@InputType()
export class createUserInfoInput {
  @Field()
  firebase_id: string;

  @Field({ nullable: true })
  user_name: string;
}

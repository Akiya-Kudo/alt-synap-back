import { Field, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  pinterest_user_id: string;
}
